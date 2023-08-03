'use client';
import { FC, useState, useRef, useCallback, MouseEvent, useEffect, ChangeEvent } from 'react';
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
import travelAgencies from '@/config/travelAgencies';
import { useFieldArray, useForm } from "react-hook-form";
import { setDaysDuration, setAgency, setAdults, setChildren } from '@/store/visitSlice';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './SelectComponents';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from './FormCn';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

const HeaderDateRange: FC<HeaderDateProps> = ({ header, originalHeaderHeight }) => {

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city.selectedCity);
  const userInput = useSelector((state: RootState) => state.input.userInput);
  const daysDuration = useSelector((state: RootState) => state.visit.daysDuration);
  const agency = useSelector((state: RootState) => state.visit.agency);
  const adults = useSelector((state: RootState) => state.visit.adults);
  const children = useSelector((state: RootState) => state.visit.children);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const toggleRef = useRef<HTMLDivElement | null>(null);

  const {pending} = useFormStatus(); 

  const selectionRange: HeaderDateRangeProps = {
    startDate,
    endDate,
    key: 'selection'
  }

  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate ?? new Date());
    setEndDate(ranges.selection.endDate ?? new Date());
  }

  const show = (node: HTMLElement | undefined, reverse: boolean = false) => {
    if (!node) return;
    const [a, b] = !reverse ? ['reverse-show', 'show'] : ['show', 'reverse-show'];
    node.classList.remove(a);
    node.classList.add(b);
  }

  const search = () => {
    const durationInDays: number = differenceInDays(endDate, startDate);
    if (durationInDays < 1) {
      toast.error('You need to stay at least 1 day!');
      return;
    }
    
    dispatch(setDaysDuration(durationInDays));

    const params = new URLSearchParams();

    //[durationInDays, agency, adults, children]
    params.set('duration', durationInDays.toString());


    toast.success(`You have booked ${durationInDays} days stay in ${selectedCity}`);
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
            <form action={formData => {
              console.log(formData)
            }} >
              <div className='relative grid grid-cols-3 gap-x-4 z-50'>
                <FormItem>
                  <Select onValueChange={(value: string) => dispatch(setAgency(value))} >
                    <SelectTrigger>
                      <SelectValue placeholder="Trip Agency" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {travelAgencies.map((agency: string, index: number) => (
                        <SelectItem
                          value={agency}
                          className='border-b hover:bg-gray-200 pointer'
                          key={index}
                        >
                          {agency}
                        </SelectItem>
                      ))}
                      <SelectItem value="m@google.com" className='border-b hover:bg-gray-200 pointer'>m@google.com</SelectItem>
                      <SelectItem value="m@support.com" className='border-b hover:bg-gray-200 pointer'>m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select onValueChange={(value: string) => dispatch(setAdults(parseInt(value))) }>
                    <SelectTrigger>
                      <SelectValue placeholder="Adults" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {[...Array(10)].map((_, index) => (
                        <SelectItem
                          value={(index + 1).toString()}
                          className='border-b hover:bg-gray-200 pointer'
                          key={index}
                        >
                          {(index + 1).toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select onValueChange={(value: string) => dispatch(setChildren(parseInt(value))) }>
                    <SelectTrigger>
                      <SelectValue placeholder="Children" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                      {[...Array(5)].map((_, index) => (
                        <SelectItem
                          value={index.toString()}
                          className='border-b hover:bg-gray-200 pointer'
                          key={index}
                        >
                          {index.toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
              <div className='w-2/3 mx-auto relative flex pt-4 date-options'>
                <button className='flex-grow text-gray-500' onClick={() => cancel()}>
                  Cancel
                </button>
                <button className='flex-grow text-red-400' onClick={() => search()}>
                  {pending ? `Scheduling your visit to ${selectedCity}` : 'Search' }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderDateRange;
