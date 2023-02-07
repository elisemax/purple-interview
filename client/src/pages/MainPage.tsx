import Card from '.././components/Card';
import Input from '.././components/Input';
import SelectInput from '.././components/SelectInput';
import Button from '.././components/Button';
import LayoutGrid from '../components/LayoutGrid';
import Loading from '../components/Loading';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { fetchConvert, fetchCurrencyStatus, fetchListCurrency } from '../store/reducers/converter';
import { changeAmount, changeFrom, changeTo } from '../store/reducers/converter';
import { useCallback, useEffect, useRef } from 'react';


const MainPage = () => {
    const dispatch = useAppDispatch();
    const onceFetch = useRef(true);
    const { convertedValue, value, status, currencyStatus, listCurrency }  = useAppSelector(state => state.converter);
    const handleConvert = useCallback( async () => {
        await dispatch(fetchCurrencyStatus())
        await dispatch(fetchConvert(value))
    }, [dispatch, value])
    useEffect(() => {
        if (onceFetch.current) {
        onceFetch.current = false;
        dispatch(fetchListCurrency())
        dispatch(fetchCurrencyStatus())
    }
    }, [])
    const stats = [
        { name: 'Most popular currency', stat: currencyStatus.popularCurrency  },
        { name: 'Total number of requests', stat: currencyStatus.totalNumberOfConversions.toString() },
        { name: 'Total conversions in  USD', stat: currencyStatus.totalAmount.toString() },
    ]    

    const element = () => {
        if (status === 'loading') {
            return <Loading />
        } else if (status === 'failed') {
            return <Card stats={{
                name: 'Error',
                stat: 'Something went wrong'
            }} />
        }
        else {
            return <Card stats={{
                name: `converted to ${value.to}`,
                stat: convertedValue.toString()
            }} />
        }
    }
    return (
        <>
            <LayoutGrid >
                {stats.map((stat) => (
                    <Card key={stat.name} stats={stat} />))}
            </LayoutGrid>
            <div className='flex ml-7'>
                <div className='flex flex-col'>
                    <Input label='Value' currency={value.from} handlechange={(e) => dispatch(changeAmount(e.value))} />
                    <SelectInput label='From' actualItem={value.from} select={listCurrency} handlechange={(e) => dispatch(changeFrom(e.name))} />
                    <SelectInput label='To' actualItem={value.to} select={listCurrency} handlechange={(e) => dispatch(changeTo(e.name))} />
                </div>
                <div>
                    {element()}
                </div>
            </div>
            <div className='ml-7'>
                <Button text="Convert" onClick={() => handleConvert()} />
            </div>
        </>
    );
    
}

export default MainPage;