import React, { useEffect } from 'react';
import axios from 'axios';
import { atom, useRecoilState, selector } from 'recoil';

const API = 'http://localhost:8080/animals';

// function useRecoilState<T>(state: RecoilState<T>): [T, SetterOrUpdater<T>];
// type SetterOrUpdater<T> = (T | (T => T)) => void;

/*
  useRecoilState의 타입을 확인한 결과 React hooks의 useState와 완벽하게 동일하게 작동한다.
*/

const animals = atom({ key: 'animal', default: [] });
// 비동기 통신코드는 Suspense와 사용하는것을 권유하고 있다.
const asyncAnimals = selector({
  key: 'asyncAnimal',
  get: async () => {
    // 예외처리를 위한 try catch
    try {
      const response = await axios.get(API);
      return response;
    } catch ({ message }) {
      return message;
    }
  },
});

function Store() {
  const [animal, setAnimal] = useRecoilState(animals);
  const [asyncAnimal] = useRecoilState(asyncAnimals);

  useEffect(() => {
    console.log(asyncAnimal);
  }, [asyncAnimal]);

  const handleOnClick = () => {
    setAnimal((state) => {
      console.log('setAnimal', state);
      return [...state, '늑대'];
    });
  };

  return (
    <div>
      <div>{asyncAnimal}</div>
      <input />
      <button onClick={handleOnClick}>입력</button>
    </div>
  );
}

export default Store;
