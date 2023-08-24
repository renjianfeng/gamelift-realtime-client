/// <reference types="ws" />
import WebSocket from "isomorphic-ws";
export interface Event {
    type: any;
    target: any;
    srcElement: any;
    currentTarget: any;
    composedPath(): any;
    eventPhase: any;
    stopPropagation(): any;
    stopImmediatePropagation(): any;
    bubbles: boolean;
    cancelable: boolean;
    preventDefault(): any;
    defaultPrevented: boolean;
    composed: boolean;
    isTrusted: boolean;
    timeStamp: number;
}
export interface OpenEvent extends Event {
    target: WebSocket;
}
export interface ErrorEvent extends Event {
    error: any;
    message: string;
    type: string;
    target: WebSocket;
}
export interface CloseEvent extends Event {
    wasClean: boolean;
    code: number;
    reason: string;
    target: WebSocket;
}
export interface MessageEvent extends Event {
    data: any;
    type: string;
    target: WebSocket;
}
