import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

// function useRecoilState<T>(state: RecoilState<T>): [T, SetterOrUpdater<T>];
// type SetterOrUpdater<T> = (T | (T => T)) => void;

/*
  useRecoilState의 타입을 확인한 결과 React hooks의 useState와 완벽하게 동일하게 작동한다.
*/

const animals = atom({ key: 'animal', default: [] });

function Store() {
  const [animal, setAnimal] = useRecoilState(animals);

  useEffect(() => {
    console.log(animal);
  }, [animal]);

  const handleOnClick = () => {
    setAnimal((state) => {
      console.log('setAnimal', state);
      return [...state, '늑대'];
    });
  };

  return (
    <div>
      <div>{animal}</div>
      <input />
      <button onClick={handleOnClick}>입력</button>
    </div>
  );
}

export default Store;
