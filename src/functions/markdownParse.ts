'use client'

//markdown渲染
import { marked } from 'marked';
//highlight.js
import hljs from 'highlight.js';

export default function markdownParse() {

    //自定义渲染
    const renderers = {
        code(code: any) {//自定义代码块的样式
            const langClass = code.lang ? `language-${code.lang}` : '';
            return `<div class='bg-gray-200 w-full flex flex-col'><div class='h-10 w-full bg-yellow-200 flex justify-between items-center'><label>${code.lang ? code.lang : 'plaintext'}</label><button>复制文本</button></div><pre class='code w-[600px]'><code class='${langClass}'>${hljs.highlight(code.text, { language: code.lang || 'plaintext' }).value}</code></pre></div>`
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

    //配置 marked
    marked.use(options);

    return marked
}

