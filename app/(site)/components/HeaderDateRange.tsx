import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

const HeaderDateRange: FC = () => {

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);
  const userInput = useSelector((state: RootState) => state.input.userInput);

  const toggleShow = useCallback(async (node: HTMLElement | null) => {
    if (node) {
      if (selectedCity !== '') {
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
  }, [selectedCity])

  return (
    <div className=''>
      <div className="">
        <div ref={toggleShow} className="translate-down-gradually shadow-md">
          1
        </div>
      </div>
    </div>
  )
}

export default HeaderDateRange;
