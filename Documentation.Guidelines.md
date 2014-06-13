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

자기가 만든 타입(type)에 대해 문서화를 할 때에는 다른 개발자가 보는 문서라는 점을 기억하세요. 다른 개발자는 타입의 기능성을 최대한 활용하려고 소스코드를 볼 수는 없을 거라고 생각하고 문서화하세요.

## Write MSDN-style documentation ![](imgs/may.png) ##

## 문서화는 MSDN 스타일로 하세요! [](imgs/may.png) ##

Following the MSDN on-line help style and word choice helps the developer to find its way through your documentation more easily.
 
단어를 선택할 때 또는 도움말의 스타일을 정할 때 MSDN 온라인 도움말 방식으로 만들면 다른 개발자가 사용하기에 더 수월합니다. 

![NOTE](imgs/note.png) Either [GhostDoc](http://submain.com/products/ghostdoc.aspx) or [Sandcastle Help File Builder](https://shfb.codeplex.com) can generate a starting point for documenting code with a shortcut key.


## Avoid inline comments ![](imgs/should.png) ##

## 인라인 방식으로 주석을 다는 것은 피하세요![](imgs/should.png) ##

If you feel the need to explain a block of code using a comment, consider replacing that block with a method having a clear name.

주석을 사용해서 어떤 코드 블럭을 설명할 필요성을 느낀다면, 주석을 다는 대신에 그 블럭의 메소드의 이름을 더 명확하게 짓는 방법을 생각하세요.

## Only write comments to explain complex algorithms or decisions ![](imgs/must.png) ##

## 아주 복잡한 알고리즘이나 결정사항에 대해서만 주석처리를 해서 설명하세요! ![](imgs/must.png) ##

Try to focus comments on the why and what of a code block and not the how. Avoid explaining the statements in words, but instead help the reader understand why you chose a certain solution or algorithm and what you are trying to achieve. If applicable, also mention that you chose an alternative solution because you ran into a problem with the obvious solution.

주석처리를 할 때에는, 설명하려는 코드 블럭이 뭘 하는지, 그것을 왜 하는지에 대한 내용을 작성하는데 초점을 맞추세요. 어떤 방법으로 하는지에 대해서가 아니라요. 코드로 작성한 내용을 말로 풀어서 설명하지 말고, 왜 특정 솔루션이나 알고리즘을 택했는지 그 이유를, 그리고 코드를 통해서 하려고 한 것은 무엇이었는지를 이해할 수 있도록 주석내용을 작성하세요. 또한 어떤 솔루션을 써야 하는지가 명백한데, 그게 아니라 대안적인 솔루션을 사용한 경우라면, 명백한 솔루션을 썼을 때 문제가 생겼기 때문에 대안적인 솔루션을 선택했다고 명확하게 주석에 적어 주세요. 

## Don't use comments for tracking work to be done later ![](imgs/may.png) ##

## 할 일 목록을 작성하는 용도로 주석을 사용하지 마세요! [](imgs/may.png) ##

Annotating a block of code or some work to be done using a TODO or similar comment may seem a reasonable way of tracking work-to-be-done. But in reality, nobody really searches for comments like that. Use a work item tracking system such as Team Foundation Server to keep track of left overs.

코드 블럭에다가 나중에 할 일 같은 내용을 주석으로 남겨두는 것은, 할 일을 관리하기에 괜찮은 방법처럼 보일 수도 있습니다. 하지만 현실에서는 아무도 그런 내용을 주석에서 찾아보지 않죠. 남은 할일을 관리하는 용도로는 Team Foundation Server같은 할일 관리 시스템(work item tracking system)을 사용하세요.
