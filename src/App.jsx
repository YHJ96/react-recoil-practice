import React, { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

// atom으로 스토어를 생성 (폴더를 만들어서 관리하면 좋을꺼 같음) key는 스토어이름, default는 기본값
const animalsStore = atom({ key: 'animals', default: [] });
const usersStore = atom({ key: 'users', default: [] });

function App() {
  // useState와 형식이 같아서 러닝커브가 적어보임
  const [animals, setAnimals] = useRecoilState(animalsStore);
  const [users, setUsers] = useRecoilState(usersStore);
  // useState에서 getter만 분리한 함수인거 같음
  const getAnimals = useRecoilValue(usersStore);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { animal, user } = e.target;
    // state와 유사하게 작동 여기 함수에서 사용하면 클로저 때문에 이전 상태 콘솔에 출력 useEffect 사용해야함
    setAnimals([...animals, animal.value]);
    setUsers([...users, user.value]);
    animal.value = null;
    user.value = null;
  };
  useEffect(() => {
    console.group();
    console.log('animals', animals);
    console.log('users', users);
    console.log('getAnimals', getAnimals);
    console.groupEnd();
  });
  return (
    <div>
      <div>{animals}</div>
      <div>{users}</div>
      <form onSubmit={handleOnSubmit}>
        <input name="animal" placeholder="동물" />
        <input name="user" placeholder="유저" />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default App;
