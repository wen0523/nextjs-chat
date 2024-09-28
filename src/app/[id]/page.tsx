import { useRouter } from 'next/navigation'

export default function ChatRoom({ params }: { params: { id: string } }) {

    return (
        <div id={params.id} className='w-[700px] h-full'>  {/* 将 id 确保为字符串 */}
        </div>
    )
}
