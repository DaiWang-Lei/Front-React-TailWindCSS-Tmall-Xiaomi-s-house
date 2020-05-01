import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import PowerIcon from '@material-ui/icons/Power';
import ToysIcon from '@material-ui/icons/Toys';
import HotTubIcon from '@material-ui/icons/HotTub';
import axios from 'axios'

const ResponsiveDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('lightyellow')
  const [title, setTitle] = React.useState('智能灯泡')
  const [icon, setIcon] = React.useState(<HotTubIcon />)

  const [online, setOnline] = React.useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



  const handleClose = () => {
    setOpen(false);
  };
  const item: Array<string> = ['定时', '固件更新', '设备信息', '帮助']
  const equipment = [{
    id: 1,
    icon: <EmojiObjectsIcon />,
    text: '智能灯泡',
    online: true
  }, {
    id: 2,
    icon: <PowerIcon />,
    text: '智能插座',
    online: false
  },
  {
    id: 3,
    icon: <ToysIcon />,
    text: '智能风扇',
    online: true
  }, {
    id: 4,
    icon: <HotTubIcon />,
    text: '智能浴缸',
    online: false
  }
  ]
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (state.checkedB == true) {
      // 在这里发送关灯请求
      // console.log('灯灭了')
      setColor('lightyellow')
     

    } else {
      // 这里发送亮灯请求
      // console.log('灯亮了')
      setColor('yellow')
     
    }
  };
  return (
    <div className='flex justify-around md:justify-between flex-wrap h-56'>
      {equipment.map((val, i) => {
        return (
          <div
            className='w-5/12 h-1/3 md:w-1/3  md:ml-24 xl:ml-40  bg-blue-200 m-2 rounded-lg '
            onClick={() => {
              setOpen(true);
              setTitle(val.text)
              setOnline(val.online)
              setIcon(val.icon)
            }}
            key={val['id']}>
            <div className=' md:m-4 m-2'>
              {val['icon']}
            </div>
            <div className='md:m-4 ml-2'>{val['text']}</div>
            {
              val['online'] ?
                <div className='md:m-4 ml-2 text-green-500'>在线</div>
                :
                <div className='md:m-4 ml-2 text-gray-600'>离线</div>
            }
          </div>
        )
      })}
      <Dialog
        className='w-full'
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <DialogContent>
          {
            !online ? <> <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">设备离线，</strong>
              <span className="block sm:inline">请连接后重试。</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              </span>
            </div>
            </>
              :
              <>
                <div className='text-center mb-3'>
                  {title}
                </div>
                {/* 这里有问题😫 */}
                <div className='w-full  h-32 bg-blue-400 rounded-lg' >
                  {
                    title == '智能灯泡' ?
                      <EmojiObjectsIcon style={{ width: 325, height: 100, color }} />
                      :
                      <ToysIcon style={{ width: 325, height: 100, color }} />

                  }
                </div>
                <div className='my-4'>设备控制</div>
                <div className='w-full bg-gray-500 flex justify-between items-center rounded-lg'>
                  <div className='float-left ml-2 '>电源快捷开关</div>
                  <Switch
                    color="primary"
                    name='checkedB'
                    checked={state.checkedB}
                    onChange={handleChange}
                  ></Switch>
                </div>

                {item.map((val, i) => {
                  return (<div
                    className='my-3 w-full bg-gray-500 h-10 rounded-lg flex items-center justify-between  px-2'
                    key={i}
                  >{val}<p>></p> </div>)
                })
                }
              </>
          }

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            退出
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ResponsiveDialog