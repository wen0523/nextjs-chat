import Link from "next/link"

export default function Test() {
   function One(){
      //这里返回one页面,相当于chat->one目录下的page.tsx(page.tsx为一个目录下显示前端页面的文件)
      //没有chat->one目录和page.tsx文件
   }

   return(
      <div>
         <Link href='/chat/one' onClick={One}>转到one页面</Link>
      </div>
   )
}