import type { IMachine, IMachines } from '../interfaces/machine'

namespace Machine {

    interface IMachine {
        name: string
    }

    let machines: IMachine[] = []

    /**
     * Generates machine(s)
     * @example Machine.generate(1)
     * @returns Machine
     */
    export function generate(m: IMachine[]): IMachines[] {
        const name = 'B';
        m.push({
            name: name
        })
        return m
    }


}

export { Machine }