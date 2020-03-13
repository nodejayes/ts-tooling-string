import {join} from 'path';
import {writeFileSync} from 'fs';
import {Benchmark} from 'collatio';

let tmp = '';

function createDataLines(stats: {name: string, duration: number, runtime: number, ops: number}[]) {
    for (const d of stats.sort((a, b) => {
        if (a.ops > b.ops) {
            return -1;
        } else if (a.ops < b.ops) {
            return 1;
        }
        return 0;
    })) {
        tmp += `| ${d.name} | ${d.ops} | ${d.duration} |\n`;
    }
}

function createStatsTable(stats: {name: string, duration: number, runtime: number, ops: number}[], method: string) {
    tmp += `### ${method} \n`;
    tmp += '\n';
    tmp += '| Benchmark | ops/sek | duration |\n';
    tmp += '|-----------|---------|----------|\n';
    createDataLines(stats);
}

function processBenchmark(bench: () => Benchmark<any>, method: string) {
    const b = bench();
    createStatsTable(b.stats, method);
    b.print(3);
}

function writeProtocol() {
    tmp += '# String Benchmarks\n';
    tmp += '\n';
    tmp += '\n';
    const protocolPath = join(__dirname, '..', 'BENCHMARKS.md');
    writeFileSync(protocolPath, tmp, {encoding: 'utf-8'});
}
writeProtocol();
