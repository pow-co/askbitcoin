import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRelay } from '../context/RelayContext'
import { NotificationCard, Loader } from '.';
import { getNotificationsFeed } from '../services';
import { useTuning } from '../context/TuningContext';
import TuningPanel from './TuningPanel';

import { FormattedMessage } from 'react-intl';

const SidebarTuning = () => {
  
  return (
    <div className='bg-gray-100 dark:bg-gray-600 rounded-lg min-h-60'>
      <div className='flex items-center p-4'>
        <p className='text-lg font-bold text-gray-900 dark:text-white'><FormattedMessage id="Tuning Panel"/></p>
      </div>
      <div className='flex flex-col p-2'>
        <TuningPanel closeAction={null}/>
      </div>
    </div>
  )
}

export default SidebarTuning