import { IBuildTaskResponse, IBuildTaskDto } from './build-task';
import { TController } from '../../../../domain/types';
import fs from 'fs';
import {
    createDockerFile,
    dockerBuild,
    dockerhubPush,
    dockerLogin,
    execute,
    getK8sConfig,
    getNewPort
} from '../../../../utils';
import yaml from 'js-yaml';
import path from 'path';

export const buildTaskController: TController<IBuildTaskDto> = async (req, resp) => {
    const { taskId } = req.body;

    let k8sConfig = getK8sConfig();
    const port = getNewPort();

    if (!k8sConfig?.items) {
        k8sConfig = { items: [] };
    }

    fs.writeFileSync(
        path.join(
            process.cwd(),
            '../',
            'backend',
            'public',
            'files',
            String(taskId),
            'task-source',
            'Dockerfile'
        ),
        createDockerFile({ PORT: port })
    );

    const dockerhubName = 'kiosite/' + taskId;
    const name = 'id-' + taskId;

    await dockerLogin();

    await dockerBuild({
        path: path.join(process.cwd(), '../', 'backend', 'public', 'files', String(taskId), 'task-source'),
        name: dockerhubName
    });

    await dockerhubPush({ id: taskId });

    const newDeployment = {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
            name: name
        },
        spec: {
            replicas: 1,
            selector: {
                matchLabels: {
                    app: name
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: name
                    }
                },
                spec: {
                    containers: [
                        {
                            name: name,
                            image: `${dockerhubName}:latest`,
                            ports: [{ containerPort: port }]
                        }
                    ]
                }
            }
        }
    };

    const newService = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
            name: name,
            labels: {
                app: name
            }
        },
        spec: {
            type: 'LoadBalancer',
            selector: {
                app: name
            },
            ports: [{ port: port, targetPort: port }]
        }
    };

    //@ts-ignore
    k8sConfig.items?.push(newDeployment);
    k8sConfig.items?.push(newService);

    const newYamlContent = yaml.dump(k8sConfig);
    fs.writeFileSync(path.join(path.join(process.cwd(), '../', '../', 'tasks.yaml')), newYamlContent, 'utf8');

    const response: IBuildTaskResponse = {
        port
    };

    execute(`kubectl apply -f ${path.join(process.cwd(), '../', '../', 'tasks.yaml')}`, () => {});

    resp.json(response).status(200);
};
