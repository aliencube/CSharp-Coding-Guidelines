# C# Coding Guidelines #

Mar 2014


# About the Guidelines #

The guidelines provide a practical way of developing .NET applications using C# 3.0 or later depending on versions that applications are using. The existing coding guidelines that **Aliencube** have been using were originally written in 2003 by [Mike Kruger](http://www.icsharpcode.net/technotes/sharpdevelopcodingstyle03.pdf). Many development environments, however, have a lot been evolved from that point of time. This document is based on [Dennis Doomen](http://www.dennisdoomen.net)'s [C# Coding Guidelines](http://csharpguidelines.codeplex.com) released on [Nov 26th, 2012](http://csharpguidelines.codeplex.com/releases/view/98254).


# History #

Since Doomen's original document was written in MS-Word and released in PDF, which is hard to be maintainable, I made a decision to use plain markdown format for easy maintenance under the same license he originally set up. In addition to that, I got a permission to translate this into Korean, which will be provided soon.


# Rationale #

Coding guidelines are sometimes overlooked since they are considered as putting some unwanted burdens on developers. However, it has already been proved to worth doing because not all developers:

* are aware that code is generally read 10 times more than it is changed;
* are aware of the potential pitfalls of certain constructions in C#;
* are introduced into certain conventions when using the .NET Framework such as `IDisposable` or the deferred execution nature of LINQ;
* are aware of the impact of using (or neglecting to use) particular solutions on aspects like security, performance, multi-language support, etc; and
* know that not every developer is as capable of understanding an elegant, but abstract, solution as the original developer.


# Basic Principles #

In general, because this document cannot cover everything for each application's purpose, those two documents provided by Microsoft are the main starting points:

* [C# Coding Conventions (C# Programming Guide)](http://msdn.microsoft.com/en-us/library/ff926074.aspx)
* [Framework Design Guidelines](http://msdn.microsoft.com/en-us/library/ms229042.aspx)

Those principles have already been applied to Visual Studio. So, using the default settings can check most of our coding conventions. [ReSharper](http://www.jetbrains.com/resharper) that we are using checks our code in a more robust way so following its default settings would be more efficient.

In addition to them, this document provides guidelines with the following principles:

* **The Principle of Least Surprise** (or Astonishment) &ndash; you should choose a solution that does include any things people might not understand, or put on the wrong track.
* **Keep It Simple Stupid** (KISS) &ndash; the simplest solution is more than sufficient.
* **You Ain't Gonna Need It** (YAGNI) &ndash; you should create a solution for the current problem rather than the ones you think will happen later on (since when can you predict the future?).
* **Don't Repeat Yourself** (DRY) &ndash; you are encouraged to prevent duplication in your code base without forgetting the [Rule of Three](http://lostechies.com/derickbailey/2012/10/31/abstraction-the-rule-of-three) heuristic.


# How to Apply #

Developers are not forced to comply with this guidelines. However, they are encouraged to apply those guidelines. Each guideline is clearly labeled like:

* ![MUST](imgs/must.png): This guideline must be considered for coding.
* ![SHOULD](imgs/should.png): This guideline is strongly recommended for coding.
* ![MAY](imgs/may.png): This guideline can be applied for coding.

![NOTE](imgs/note.png) The terms &ndash; `must`, `should` and `may` &ndash; are defined in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt)


# Table of Contents #

* [Class Design Guidelines](Class.Design.Guidelines.md)
* [Member Design Guidelines](Member.Design.Guidelines.md)
* [Miscellaneous Design Guidelines](Miscellaneous.Design.Guidelines.md)
* [Maintainability Guidelines](Maintainability.Guidelines.md)
* [Naming Guidelines](Naming.Guidelines.md)
* [Performance Guidelines](Performance.Guidelines.md)
* [Framework Guidelines](Framework.Guidelines.md)
* [Documentation Guidelines](Documentation.Guidelines.md)
* [Layout Guidelines](Layout.Guidelines.md)
* [Important Resources](Important.Guidelines.md)



# License #

This is released under **New BSD License** as its original distributor does.

>Copyright (c) 2014, aliencube.org All rights reserved.

>Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

>* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

>* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

>* Neither the name of the aliencube.org nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

>THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.