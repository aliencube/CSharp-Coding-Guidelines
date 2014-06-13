# Documentation Guidelines #

## Write comments and documentation in English ![](imgs/must.png) ##

Documents must be written in English (see [here](Naming.Guidelines.md#use-english-)).

![NOTE](imgs/note.png) Doomen's original document clearly stated that *Use US-English*. In this document, the *US* part is deliberately omitted.


## Document all public, protected and internal types and members ![](imgs/should.png) ##

Documenting your code allows Visual Studio to pop-up the documentation when your class is used somewhere else. Furthermore, by properly documenting your classes, tools can generate professionally looking class documentation.


## Write XML documentation with another developer in mind ![](imgs/should.png) ##

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
