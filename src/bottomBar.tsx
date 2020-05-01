import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { setPage } from './state';





export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <div className='border-2 '>
            <BottomNavigation
                value={value}
                showLabels
            >
                <BottomNavigationAction label="首页" icon={<HomeIcon />} onClick={() => {
                    setPage('home')
                    setValue(0)
                }} />
                <BottomNavigationAction label="我的" icon={<AccountCircleSharpIcon />} onClick={() => {
                    setPage('profile')
                    setValue(1)
                }}
                />
            </BottomNavigation>
        </div>
    );
}
