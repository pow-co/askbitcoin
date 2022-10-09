
import QuestionPage from './index'

export default function LastWeek() {

    return QuestionPage({ period: 'last-week' })
} 

LastWeek.Layout = 'authGuard';
