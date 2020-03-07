export interface Progress {
    percentage: number;
    transferred: number;
    length: number;
    remaining: number;
    eta: number;
    runtime: number;
    delta: number;
    speed: number;
}

export interface DownloadProgress {
    videoId: string;
    progress: Progress;
}