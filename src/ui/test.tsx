import markdownParse from '@/functions/markdownParse.ts';

export default function Test() {
    const markdown = `积分：$\int_{a}^{b} f(x) \, dx$`
    function change() {
        document.getElementById('test').innerHTML=markdownParse().parse(markdown);
    }
    return (
        <>
            <div id="test" className="w-5/6 h-screen bg-blue-600">
            <pre className='rounded-lg bg-white p-4'>

            </pre>
            </div>
            <button className="bg-yellow-300" onClick={change}>解析</button>
        </>
    )
}