
import QuestionPage from './index'

export default function AllTime() {

    return QuestionPage({ period: 'all-time'})
} 

AllTime.Layout = 'authGuard';
