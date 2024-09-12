import markdownParse from '@/functions/markdownParse.ts';

export default function Test() {
    const markdown1 = `
Markdown的所有类型包括：

1. 标题：使用#符号表示各级标题，示例：
   - # 一级标题
   - ## 二级标题
   - ### 三级标题

2. 段落：通过空行分隔的文本行即为一个段落。

3. 强调：使用*或_符号包围文本可以实现斜体或加粗效果，示例：
   - *斜体文本*
   - **加粗文本**

4. 列表：可以使用无序列表和有序列表。
   - 无序列表使用-或*符号，示例：
     - 无序列表项1
     - 无序列表项2
   - 有序列表使用数字和.，示例：
     1. 有序列表项1
     2. 有序列表项2

5. 引用：使用>符号表示引用文本，示例：
   > 第一层引用
   >
   > > 第二层引用

6. 链接：使用[]和()符号表示链接文本和链接地址，示例：
   - [链接文本](链接地址)

7. 图片：与链接类似，只是在链接语法前加一个！符号，示例：
   - ![图片描述](图片链接地址)

8. 代码块：使用\`\`\`符号表示代码块，示例：
   \`\`\`
   代码内容
   \`\`\`

9. 表格：使用|符号进行列的分割，示例：
   \`\`\`
   | 列1 | 列2 |
   |-----|-----|
   | 内容 | 内容 |
   \`\`\`

10. 分割线：使用三个以上的-、*或_符号表示分割线，示例：
    \`\`\`
    ---
    ***
    ___
    \`\`\`

11. 其他：Markdown还支持更多其他的语法，如脚注、删除线、行内代码等。

请注意，以上仅列举了Markdown的一些常用语法类型，实际上Markdown拥有更多的语法功能和扩展
`
const markdown2 = `
> 第一层引用
>
> > 第二层引用
`
const markdown3 = `
1. 第一层引用
   1. 第二层引用
   2. as
2. as
   - as
   - as
   - as
`

    function change() {
        document.getElementById('test').innerHTML=markdownParse().parse(markdown1);
    }
    return (
        <>
            <div id="test" className="bg-blue-100 w-5/6 h-screen">
            </div>
            <button className='bg-blue-300 h-screen' onClick={change}>
              parse
            </button>
            
        </>
    )
}