/**
 * Created by xiamubobby on 16/6/30.
 */
export interface Stageable {
    enter: ()=>void;
    exit: ()=>void;
}

export interface Resizeable {
    shrink: ()=>void;
    expand: (callback?: ()=>void)=>void;
}