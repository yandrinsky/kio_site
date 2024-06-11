import { IFrame } from '../../../../bd';

export interface IGetFrameDto {
    tryId: string;
    frameId: string;
}

export interface IGetFrameResponse extends IFrame {}
