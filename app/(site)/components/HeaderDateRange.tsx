'use client';
import { FC, useState, useRef, useCallback, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRangePicker } from 'react-date-range';
import { RootState } from '@/store';
import { setUserInput } from '@/store/inputSlice';
import { setSelectedCity } from '@/store/citySlice';
import { DateRange } from 'react-date-range';
import { RangeKeyDict } from 'react-date-range';
import HeaderDateProps, { HeaderDateRangeProps } from '@/app/interfaces/props/HeaderDateRangeProps';
import { toast } from 'react-hot-toast';
import { differenceInDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const HeaderDateRange: FC<HeaderDateProps> = ({header, originalHeaderHeight}) => {

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);
  const userInput = useSelector((state: RootState) => state.input.userInput);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const toggleRef = useRef<HTMLDivElement|null>(null);

  const selectionRange: HeaderDateRangeProps = {
    startDate,
    endDate,
    key: 'selection'
  }

  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate ?? new Date());
    setEndDate(ranges.selection.endDate ?? new Date());
  }

  const show = (node: HTMLElement|undefined, reverse: boolean = false) => {
    if (!node) return;
    const [a, b] = !reverse ? ['reverse-show', 'show'] : ['show', 'reverse-show'];
    node.classList.remove(a);
    node.classList.add(b);
  }

  const search = () => {
    const daysDuration: number = differenceInDays(endDate, startDate);
    if (daysDuration < 1) {
      toast.error('You need to stay at least 1 day!');
      return;
    }
    toast.success(`You have booked ${daysDuration} days stay in ${selectedCity}`);
  }

  const cancel = () => {
    dispatch(setUserInput(''));
    dispatch(setSelectedCity(''));
    show((toggleRef.current?.parentNode as HTMLElement) ?? undefined, true);
  }

  const toggleShow = useCallback(async (node: HTMLElement | null) => {
    if (!node) return;
    (node.getElementsByClassName('rdrInputRange')[0] as HTMLDivElement).innerText = `Pick days to visit ${selectedCity}!`;
    show(node, selectedCity === '');
    
  }, [selectedCity])

  return (

    <div className={`${selectedCity ? 'block' : 'hidden'} origin-top-left date`}>
    <div ref={toggleShow} className='translate-down-gradually bg-white w-full md:scale-100 mx-auto transform flex flex-col md:items-center'>
      <div ref={toggleRef} >
      <div>
        <DateRangePicker
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={['#FD5B61']}
          onChange={handleSelect}
          className="bg-red"
        />
        <div className='flex pt-2 date-options'>
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
