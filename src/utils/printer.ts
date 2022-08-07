// Unfortunately, our printer dependency relies on node 12. This util forks out to a node 12 process which handles our print

import child_process from 'child_process';

const NODE_12_PATH = process.env.NODE_12_PATH;
const PRINT_SYSTEM_PATH = process.env.PRINT_SYSTEM_PATH;

export const printer = (filename: string) => {
	const cmd = `${NODE_12_PATH} ${PRINT_SYSTEM_PATH} ${filename}`;
	const process_result = child_process.execSync(cmd);
	console.log({process_result});
}