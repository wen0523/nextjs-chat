import markdownParse from '@/functions/markdownParse.ts';

export default function Test() {
    const markdown = `
# Hello World

This is a test.
`
    function change() {
        document.getElementById('test').innerHTML=markdownParse().parse(markdown);
    }
    return (
        <>
            <div id="test" className="w-5/6 h-screen bg-blue-600">
            </div>
            <button className="bg-yellow-300" onClick={change}>解析</button>
        </>
    )
}