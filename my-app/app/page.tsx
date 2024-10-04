'use client';

import { useEffect, useState } from 'react';

interface Machine {
  name: string;
  state: 'idle' | 'running' | 'down' | 'starting...';
}

export default function Home() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const addRandomMachine = (quantity: number) => {
    const states: Machine['state'][] = [
      'idle',
      'running',
      'down',
      'starting...',
    ];
    const newMachines = Array.from({ length: quantity }, () => ({
      name: `Machine ${Math.floor(Math.random() * 100)}`,
      state: states[3],
    }));
    setMachines([...machines, ...newMachines]);
  };

  const clearMachines = () => {
    setMachines([]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prevMachines) => {
        const states: Machine['state'][] = ['idle', 'running', 'down'];
        const weights = [0.3, 0.6, 0.1];
        const cumulativeWeights = weights.map(
          (
            (sum) => (value) =>
              (sum += value)
          )(0)
        );

        return prevMachines.map((machine) => {
          if (Math.random() < 0.02) {
            const random = Math.random();
            const newState =
              states[cumulativeWeights.findIndex((weight) => random < weight)];
            return { ...machine, state: newState };
          }
          return machine;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <main>
        <h1>Machines Status</h1>
        <input
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min='1'
        />
        <button onClick={() => addRandomMachine(quantity)}>
          Generate Machines
        </button>
        <button onClick={clearMachines}>Clear Machines</button>
        <ul>
          {machines.map((machine, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor:
                    machine.state === 'down'
                      ? 'red'
                      : machine.state === 'idle'
                      ? 'yellow'
                      : machine.state === 'running'
                      ? 'green'
                      : machine.state === 'starting...'
                      ? 'blue'
                      : 'gray',
                  marginRight: '8px',
                }}
              ></div>
              {machine.name} - {machine.state}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
