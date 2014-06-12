# 이 가이드라인에 대하여 (About the Guidelines) #

이 가이드라인은 C# 3.0 혹은 그 이후 버전을 사용한 닷넷 어플리케이션을 개발하는데 있어 실용적인 방향을 제시합니다. **Aliencube**가 지금까지 사용해 왔던 가이드라인은 2003년에 [Mike Kruger](http://www.icsharpcode.net/technotes/sharpdevelopcodingstyle03.pdf)가 작성했던 것이었습니다. 하지만 현재에 이르러서는 그 당시의 개발 환경과는 많은 부분들이 발전해 왔습니다. 이 문서는 [Dennis Doomen](http://www.dennisdoomen.net)이 작성하여 [2012년 11월 26일](http://csharpguidelines.codeplex.com/releases/view/98254)에 배포한 [C# Coding Guidelines](http://csharpguidelines.codeplex.com)을 기초로 합니다.


## 약간의 배경지식 (History) ##

Doomen는 원본 문서를 MS워드 포맷으로 작성한 후 PDF 포맷으로 배포해 왔는데, 이 방식은 딱히 유지보수에 편리한 방법이 아닙니다. 그래서, 마크다운 포맷으로 바꾸어 Doomen이 배포한 것과 동일한 라이센스 아래 좀 더 쉽게 유지보수를 할 수 있게 바꾸었습니다. 거기에 더불어 이 문서는 한국어로도 번역할 수 있게끔 허락을 받았습니다.


## 가이드라인을 만들게 된 계기 (Rationale) ##

코딩 가이드라인이라 하면 종종 개발자에게 불필요한 부담으로 다가와서 간과하는 경우가 많습니다. 하지만, 가이드라인을 따르는 것이 중요한데 왜냐하면:

* 모든 개발자들이 코드의 변경사항을 10회 이상 읽는 것은 아니기 때문입니다.
* 모든 개발자들이 C#으로 작성한 어떤 코드의 잠재적인 문제점을 속속들이 다 알고 있는 것은 아니기 때문입니다.
* 모든 개발자들이 `IDisposable`과 같은 닷넷 프레임워크를 사용한다거나 LINQ가 갖는 "지연된 실행"의 속성들에 대해 어떤 관례들이 있는지 다 알고 있는 것은 아니기 때문입니다.
* 모든 개발자들이 보안, 성능, 다국어 지원 등과 같은 특정 솔루션들을 사용한다거나 무시한다거나 할 때 미치는 결과에 대해 다 알고 있는 것은 아니기 때문입니다.
* 마지막으로 모든 개발자들이 최초 개발자의 우아하지만 추상적인 솔루션에 대해 완벽한 이해를 할 수 있는 것은 아니기 때문입니다.


## 가이드라인 기본 원칙 (Basic Principles) ##

이 문서가 각 어플리케이션들이 지향하는 바를 모두 커버할 수는 없기 때문에 일반적으로는 마이크로소프트에서 제공하는 아래 두 문서를 시작점으로 하여 개발을 진행합니다:

* [C# Coding Conventions (C# Programming Guide)](http://msdn.microsoft.com/en-us/library/ff926074.aspx)
* [Framework Design Guidelines](http://msdn.microsoft.com/en-us/library/ms229042.aspx)

이 원칙은 이미 비주얼 스튜디오에 기본값으로 지정되어 있습니다. 따라서 비주얼 스튜디오의 기본 설정값들을 그대로 사용하는 것은 거의 대부분의 코딩 관례들을 다 따른다고 볼 수 있습니다. 코드를 체크하기 위하여 [ReSharper](http://www.jetbrains.com/resharper) 를 사용하는 것은 조금 더 안정적인 방법이 될 수 있습니다. 이렇게 하면 기본 설정값을 사용하는 것만으로도 상당히 효과를 볼 수 있습니다.

그에 덧붙여서 이 문서는 아래의 원칙들을 제안합니다:

* **The Principle of Least Surprise** &ndash; 사람들이 잘못 이해하거나 엉뚱하게 행동할 수 있는 것들을 포함하지 않는 솔루션을 선택해야 합니다.
* **Keep It Simple Stupid** (KISS) &ndash; 가장 단순한 솔루셔이면 충분합니다.
* **You Ain't Gonna Need It** (YAGNI) &ndash; 현재 문제를 해결할 수 있는 솔루션이면 충분합니다. 굳이 나중에 발생할지 아닐지도 모르는 문제들을 위해 지금 고민할 필요는 없습니다.
* **Don't Repeat Yourself** (DRY) &ndash; [Rule of Three](http://lostechies.com/derickbailey/2012/10/31/abstraction-the-rule-of-three) 원칙을 잊지 않게끔 코드의 중복을 예방해야 합니다.


## 가이드라인 적용 방법 (How to Apply) ##

Developers are not forced to comply with this guidelines. However, they are encouraged to apply those guidelines. Each guideline is clearly labeled like:

* ![MUST](imgs/must.png): This guideline must be considered for coding.
* ![SHOULD](imgs/should.png): This guideline is strongly recommended for coding.
* ![MAY](imgs/may.png): This guideline can be applied for coding.

![NOTE](imgs/note.png) The terms &ndash; `must`, `should` and `may` &ndash; are defined in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt)


## 유용한 정보들 (Useful Resources) ##

In addition to the many links provided throughout this document, the following books, articles and sites for everyone interested in software quality are recommended:

* [Code Complete: A Practical Handbook of Software Construction](http://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670) (Steve McConnel)

It deals with all aspects of software development, and even though the book was originally written in 2004, but you'll be surprised when you see how accurate it still is. I wrote a review in 2009 if you want to get a sense of its contents.

* [The Art of Agile Development](http://www.amazon.com/Art-Agile-Development-James-Shore/dp/0596527675) (James Shore)

Another great all-encompassing trip through the many practices preached by processes like Scrum and Extreme Programming. If you're looking for a quick introduction with a pragmatic touch, make sure you read James' book.

* [Applying Domain Driven-Design and Patterns: With Examples in C# and .NET](http://www.amazon.com/Applying-Domain-Driven-Design-Patterns-Examples/dp/0321268202) (Jimmy Nilsson)

The book that started my interest for both Domain Driven Design and Test Driven Development. It's one of those books that I wished I had read a few years earlier. It would have saved me from many mistakes.

* [Jeremy D. Miller's Blog](http://codebetter.com/blogs/jeremy.miller)

Although he is not that active anymore, in the last couple of years he has written some excellent blog posts on Test Driven Development, Design Patterns and design principles. I've learned a lot from his real-life and practical insights.

* [LINQ Framework Design Guidelines](http://blogs.msdn.com/b/mirceat/archive/2008/03/13/linq-framework-design-guidelines.aspx)

A set of rules and recommendations that you should adhere to when creating your own implementations of `IQueryable<T>`.

* [Best Practices for c# `async`/`await`](http://code.jonwagner.com/2012/09/06/best-practices-for-c-asyncawait/)

The rationale and source of several of the new guidelines in this documented, written by [Jon Wagner](https://twitter.com/jonwagnerdotcom).


# 목차 (Table of Contents) #

* [Class Design Guidelines](Class.Design.Guidelines.md)
* [Member Design Guidelines](Member.Design.Guidelines.md)
* [Miscellaneous Design Guidelines](Miscellaneous.Design.Guidelines.md)
* [Maintainability Guidelines](Maintainability.Guidelines.md)
* [Naming Guidelines](Naming.Guidelines.md)
* [Performance Guidelines](Performance.Guidelines.md)
* [Framework Guidelines](Framework.Guidelines.md)
* [Documentation Guidelines](Documentation.Guidelines.md)
* [Layout Guidelines](Layout.Guidelines.md)


# 라이센스 (License) #

This is released under **New BSD License** as its original distributor does.

>Copyright (c) 2014, aliencube.org All rights reserved.

>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

>* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

>* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

>* Neither the name of the aliencube.org nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

>THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.