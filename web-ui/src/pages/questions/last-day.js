
import QuestionPage from './index'

export default function LastDay() {

    return QuestionPage({ period: 'last-day' })
} 

LastDay.Layout = 'authGuard';
