import React, { useEffect } from 'react';
import { atom, useRecoilState, useRecoilValue, selector } from 'recoil';

// atom으로 스토어를 생성 (폴더를 만들어서 관리하면 좋을꺼 같음) key는 스토어이름, default는 기본값
const animalsStore = atom({ key: 'animals', default: [] });
const usersStore = atom({ key: 'users', default: [] });
// selector는 스토어를 합치거나 커스텀 데이터를 정제 가능해보임
// getter와 setter를 마음대로 바꿀수 있음 조합이 가능함
const zooStore = selector({
  key: 'zoo',
  get: ({ get }) => {
    const animals = get(animalsStore);
    const users = get(usersStore);
    return { zoo: { animals, users } };
  },
  set: ({ set }, value) => {
    set(animalsStore, value);
  },
});

function App() {
  // useState와 형식이 같아서 러닝커브가 적어보임
  const [animals, setAnimals] = useRecoilState(animalsStore);
  const [users, setUsers] = useRecoilState(usersStore);
  // getter 자리에 얻어 올 수 있음
  const zooValue = useRecoilValue(zooStore);
  const [zoo, setZoo] = useRecoilState(zooStore);
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
    setZoo(['늑대']);
  };
  useEffect(() => {
    console.group();
    console.log('animals', animals);
    console.log('users', users);
    console.log('getAnimals', getAnimals);
    console.groupEnd();
    console.log(zooValue, zoo);
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
