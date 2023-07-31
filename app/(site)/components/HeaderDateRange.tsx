'use client';
import { FC, useState, useRef, useCallback, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRangePicker } from 'react-date-range';
import { RootState } from '@/store';
import { setUserInput } from '@/store/inputSlice';
import { setSelectedCity } from '@/store/citySlice';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const HeaderDateRange: FC = ({header, originalHeaderHeight}) => {

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);
  const userInput = useSelector((state: RootState) => state.input.userInput);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const toggleRef = useRef(null);

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const show = (node: HTMLElement|undefined, reverse: boolean = false) => {
    if (!node) return;
    const [a, b] = !reverse ? ['reverse-show', 'show'] : ['show', 'reverse-show'];
    node.classList.remove(a);
    node.classList.add(b);
  }

  const search = () => {
    console.log(1);
  }

  const cancel = () => {
    dispatch(setUserInput(''));
    dispatch(setSelectedCity(''));
    show(toggleRef.parentNode, true);
  }

  const toggleShow = useCallback(async (node: HTMLElement | null) => {
    if (!node) return;
    show(node, selectedCity === '');
    
  }, [selectedCity])

  useEffect(() => {

  }, []);

  return (

    <div className={`${selectedCity ? 'block' : 'hidden'}`}>
    <div ref={toggleShow} className='translate-down-gradually bg-white w-full mx-auto col-h'>
      <div ref={toggleRef} >
      <div>
        <DateRangePicker
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={['#FD5B61']}
          onChange={handleSelect}
          className="bg-red"
        />
        <div className='flex pt-2'>
          <button className='flex-grow text-gray-500' onClick={() => cancel()} >Cancel</button>
          <button className='flex-grow text-red-400' onClick={() => search()}>Search</button>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default HeaderDateRange;
