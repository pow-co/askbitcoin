
import QuestionPage from './index'

export default function LastMonth() {

    return QuestionPage({ period: 'last-month' })
} 
LastMonth.Layout = 'authGuard';
