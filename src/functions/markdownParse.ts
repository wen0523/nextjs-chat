'use client'

//注意因为使用了tailwindcss,所以有的样式被覆盖导致解析的不正确，只需将样式在global.css中添加即可

//markdown渲染
import { marked } from 'marked';
//highlight.js
import hljs from 'highlight.js';
//数学公式渲染
import markedKatex from "marked-katex-extension";

export default function markdownParse() {
    //自定义渲染
    const renderers = {
        code(code: any) {//自定义代码块的样式
            const langClass = code.lang ? `language-${code.lang}` : '';
            return `<pre class='my-2'>` +
                `<div class='rounded-[8px] flex flex-col'>` +
                `<div class='py-2 px-3 w-full bg-gray-800 rounded-t-[8px] text-sm text-gray-200 flex justify-between items-center'>` +
                `<label>${code.lang ? code.lang : 'plaintext'}</label>` +
                `<button class='flex flex-row items-center' onClick="` +
                `navigator.clipboard.writeText(event.target.parentElement.parentElement.nextElementSibling.firstElementChild.textContent)` +
                `">` +
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path></svg>` +
                `<label class='pl-1'>复制文本</label>` +
                `</button>` +
                `</div>` +
                `<div class='p-3 rounded-b-[8px] bg-black text-white' >` +
                `<code class='${langClass}'>${hljs.highlight(code.text, { language: code.lang || 'plaintext' }).value}</code>` +
                `</div></div></pre>`
        },
        codespan(codespan: any) {//自定义行内代码样式
            return `<code class='text-base-300'>${codespan.text}</code>`
        },
        //....其他渲染器
    }

    // 配置代码高亮,及一些基础配置
    const options = {
        breaks: true, // 在单个换行符处添加 <br>（模仿 GitHub 在评论中的行为）
        gfm: true, // 启用 GitHub 风格的 Markdown
        pedantic: false, // 不启用原始的 Markdown 模式
        renderer: renderers, // 自定义渲染器
    };

    //配置数学公式
    const mathOptions = {
        throwOnError: false,
        nonStandard: true
    };
    //配置 marked
    marked.use(options);
    marked.use(markedKatex(mathOptions));

    return marked
}

