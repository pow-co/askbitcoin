
import QuestionPage from './index'

export default function LastYear() {

    return QuestionPage({ period: 'last-year' })
} 
LastYear.Layout = 'authGuard';
