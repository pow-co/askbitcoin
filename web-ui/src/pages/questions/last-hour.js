
import QuestionPage from './index'

export default function LastHour() {

    return QuestionPage({ period: 'last-hour' })
} 

LastHour.Layout = 'authGuard';
