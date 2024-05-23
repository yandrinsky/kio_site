import fs from 'fs';
import yaml from 'js-yaml';
import { exec } from 'node:child_process';

export const getK8sConfig = () => {
    let k8sConfig = null;

    try {
        const fileContents = fs.readFileSync('../../tasks.yaml', 'utf8');
        k8sConfig = yaml.load(fileContents);
    } catch (e) {
        console.error(e);
    }

    return k8sConfig as {
        items?: {
            apiVersion: string;
            kind: string;
            spec: { ports: { port: number; targetPort: number }[] };
        }[];
    } | null;
};

export const getNewPort = () => {
    const config = getK8sConfig();

    const lastPort = config?.items?.slice(-1)[0].spec.ports[0]?.port;
    return lastPort ? lastPort + 1 : 3060;
};

export const dockerLogin = async () => {
    return new Promise(resolve => {
        const login = process.env.DOCKER_USERNAME ?? 'yandrinsky@gmail.com';
        const password = process.env.DOCKER_PASSWORD ?? 'iKuyLdR$UMt*9r7';

        const loginCommand = `echo '${password}' | docker login --username ${login} --password-stdin`;

        execute(loginCommand, output => {
            output.toLowerCase().includes('Login Succeeded'.toLowerCase()) && resolve(null);
        });
    });
};

export const dockerBuild = async ({ path = '.', name }: { path: string; name: string }) => {
    return new Promise(resolve => {
        execute(`docker build ${path} -t ${name}`, () => {
            resolve(null);
        });
    });
};

export const execute = (command: string, callback: (arg: string) => void) => {
    exec(
        command,
        {
            env: process.env,
            shell: '/bin/bash'
        },
        (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                // appendLog(`Exec error: ${error}`);
                return;
            }

            stdout && console.log(`stdout: ${stdout}`);
            // stdout && appendLog(`Stdout: ${stdout}`);
            stderr && console.error(`stderr: ${stderr}`);
            // stderr && appendLog(`Stderr: ${stdout}`);
            callback?.(stdout);
        }
    );
};

const appendLog = (log: string) => {
    const getTime = () => {
        const time = new Date();
        return `${String(time.getDate()).padStart(2, '0')}.${String(time.getMonth() + 1).padStart(
            2,
            '0'
        )}.${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    };

    fs.appendFileSync('logs.txt', `${getTime()} ${log}\n`);
};

export const dockerhubPush = async ({ id }: { id: string }) => {
    return new Promise(resolve => {
        execute(`docker push kiosite/${id}`, () => {
            resolve(null);
        });
    });
};

export const createDockerFile = ({ PORT }: { PORT: number }) => {
    return `FROM --platform=linux/amd64 node:alpine

WORKDIR /app

EXPOSE ${PORT}

RUN npm install serve

COPY . ./

CMD ["npx", "serve", "-p", "${PORT}", "./dist"]
`;
};
