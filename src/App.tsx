import './App.css';

import React, { FC, useState } from 'react';

import { generateRandomParty } from './mockdata';

export const App: FC = () => {
  const [partyTable, setPartyTable] = useState<PartyPerson[]>(generateRandomParty(20));
  const [newPerson, setNewPerson] = useState<Partial<PartyPerson>>({});
  const [editCell, setEditCell] = useState<[number, string]>();
  const propsToCheck:PartyPersonProp[] = ['firstName', 'lastName', 'address', 'phone'];

  const addNew = () => {
    //  check if new person has what we want
    if (propsToCheck.find((prop) => !newPerson[prop])) {
      alert('missing values');
      return;
    }
    setPartyTable([...partyTable, { id: partyTable.length, ...newPerson } as PartyPerson]);
    setNewPerson({});
  };

  const editProp = (newValue: string) => {
    if (!editCell) return;
    const [editingRow, editingProp] = editCell;
    const newTable = partyTable.map((person, idx) => {
      if (idx === editingRow) {
        return { ...person, [editingProp]: newValue };
      }
      return person;
    });
    setPartyTable(newTable);
  };

  const deletePerson = (idToDelete:number) => {
    setPartyTable(partyTable.filter(({id}) => id !== idToDelete));
  }

  const orderBy = (prop:PartyPersonProp) => {
    const sortedTable =   [...partyTable];
    sortedTable.sort((a, b) => {
      if (a[prop] < b[prop]) {
        return -1;
      } else if (a[prop] > b[prop]) {
        return 1;
      }
      return 0;
    });
    setPartyTable(sortedTable);
  }

  return (
    <div className='App'>
      <table>
        <tr>{['id',...propsToCheck].map(prop => <th onClick={() => orderBy(prop as PartyPersonProp)}>{prop}</th>)}</tr>
        {partyTable.map((person, idx) => (
          <tr key={person.id}>
            {Object.entries(person).map(([key, value]) => {
              const editingThisCell = editCell && editCell[0] === idx && editCell[1] === key;
              if (editingThisCell) {
                return (
                  <td key={idx + '_' + key}>
                    <input value={value} onChange={(e) => editProp(e.target.value)} />
                  </td>
                );
              }
              return (
                <td key={idx + '_' + key} onClick={() => setEditCell([idx, key])}>
                  {value}
                </td>
              );
            })}
            <td><button onClick={() => deletePerson(person.id)}>Del</button></td>
          </tr>
        ))}

        <tr>
          <td>Add new:</td>
          {propsToCheck.map((prop) => (
            <td>
              <input type='text' onChange={(e) => setNewPerson({ ...newPerson, [prop]: e.target.value })} value={newPerson[prop as PartyPersonProp] || ''} />
            </td>
          ))}
          <td>
            <button onClick={addNew}>Add</button>
          </td>
        </tr>
      </table>
    </div>
  );
};
