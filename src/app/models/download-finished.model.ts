export interface Stats {
    transferredBytes: number;
    runtime: number;
    averageSpeed: number;
}

export interface DownLoadFinished {
    videoId: string;
    stats: Stats;
    file: string;
    youtubeUrl: string;
    videoTitle: string;
    artist: string;
    title: string;
    thumbnail: string;
}
