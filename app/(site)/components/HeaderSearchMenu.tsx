import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HeaderSearchMenu: FC = () => {

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const userInput = useSelector((state) => state.input.userInput);
  const toggleShow = useCallback(async (node) => {
    if (node) {
      if (userInput !== '') {
        node.classList.remove('reverse-show');
        node.classList.add('show');
        document.getElementsByTagName('header')[0].classList.remove('shadow-md');
      }
      else {
        node.classList.remove('show');
        node.classList.add('reverse-show');
        await wait(350);
        document.getElementsByTagName('header')[0].classList.add('shadow-md');
      }
    }
  })

  return (
    <div className=''>
      <div className="">
        <div ref={toggleShow} className="translate-down-gradually shadow-md">sds</div>
      </div>
    </div>
  )
}

export default HeaderSearchMenu;
