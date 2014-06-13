# 문서화 가이드라인 (Documentation Guidelines) #

## Write comments and documentation in English ![](imgs/must.png) ##

## 주석과 문서는 영어로 작성해 주세요! ![](imgs/must.png) ##

Documents must be written in English (see [here](Naming.Guidelines.md#use-english-)).
문서는 영어로 작성해야 합니다. (([이 문서](Naming.Guidelines.md#use-english-)를 참고하세요).

![NOTE](imgs/note.png) Doomen's original document clearly stated that *Use US-English*. In this document, the *US* part is deliberately omitted.

![NOTE](imgs/note.png) Doomen이 작성한 원래(original) 문서를 보면 *미국식 영어를 사용하세요*라고 명확하게 나와 있습니다. 이 문서에서는 *미국식* 부분은 의도적으로 뺐습니다. 

## Document all public, protected and internal types and members ![](imgs/should.png) ##

## public, protected, internal 타입과 멤버에 대해 모두 문서화하세요![](imgs/should.png) ##

Documenting your code allows Visual Studio to pop-up the documentation when your class is used somewhere else. Furthermore, by properly documenting your classes, tools can generate professionally looking class documentation.

코드에 대해서 문서화작업을 해두면, 클래스가 사용될 때 비쥬얼 스튜디오에서 팝업창이 뜹니다. 또한 클래스에 대해서 문서화 작업을 잘 해두면, 툴(tool)에서 클래스 매뉴얼(class documentation)을 전문적으로 보이게 생성해 줍니다. 

## Write XML documentation with another developer in mind ![](imgs/should.png) ##

## XML 문서화(XML documentation)을 할 때에는 다른 개발자를 배려하세요! [](imgs/should.png) ##

Write the documentation of your type with another developer in mind. Assume he or she will not have access to the source code and try to explain how to get the most out of the functionality of your type.


## Write MSDN-style documentation ![](imgs/may.png) ##

Following the MSDN on-line help style and word choice helps the developer to find its way through your documentation more easily.
 
![NOTE](imgs/note.png) Either [GhostDoc](http://submain.com/products/ghostdoc.aspx) or [Sandcastle Help File Builder](https://shfb.codeplex.com) can generate a starting point for documenting code with a shortcut key.


## Avoid inline comments ![](imgs/should.png) ##

If you feel the need to explain a block of code using a comment, consider replacing that block with a method having a clear name.


## Only write comments to explain complex algorithms or decisions ![](imgs/must.png) ##

Try to focus comments on the why and what of a code block and not the how. Avoid explaining the statements in words, but instead help the reader understand why you chose a certain solution or algorithm and what you are trying to achieve. If applicable, also mention that you chose an alternative solution because you ran into a problem with the obvious solution.


## Don't use comments for tracking work to be done later ![](imgs/may.png) ##

Annotating a block of code or some work to be done using a TODO or similar comment may seem a reasonable way of tracking work-to-be-done. But in reality, nobody really searches for comments like that. Use a work item tracking system such as Team Foundation Server to keep track of left overs.

