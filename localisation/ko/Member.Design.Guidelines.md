# 멤버 설계 가이드라인 Member Design Guidelines #

## Allow properties to be set in any order ![](imgs/must.png) ##

Properties should be stateless with respect to other properties, i.e. there should not be a difference between first setting property `A` and then `B` or vice versa.


## Use a method instead of a property ##

Using a method is way better than a property, if:

* The work is more expensive than setting a field value;
* it represents a conversion such as the `Object.ToString()` method;
* it returns a different result each time it is called, even if the arguments didn't change. For example, the `NewGuid()` method returns a different value each time it is called; or
* the operation causes a side effect such as changing some internal state not directly related the property (which violates the [Command Query Separation](http://martinfowler.com/bliki/CommandQuerySeparation.html)).

![EXCEPTION](imgs/exception.png) Populating an internal cache or implementing [lazy-loading](http://www.martinfowler.com/eaaCatalog/lazyLoad.html) is a good exception.


## Don't use mutually exclusive properties ![](imgs/must.png) ##

Having properties that cannot be used at the same time typically signals a type that is representing two conflicting concepts. Even though those concepts may share some of the behavior and state, they obviously have different rules that do not cooperate.

This violation is often seen in domain models and introduces all kinds of conditional logic related to those conflicting rules, causing a ripple effect that significantly worsens the maintenance burden.


## A method or property does only one thing ![](imgs/must.png) ##

Based on [SRP][srp], a method ![MUST](imgs/must.png) have a single responsibility.


## Don't expose stateful objects through static members ![](imgs/should.png) ##

A stateful object is an object that contains many properties and lots of behavior behind that. If you expose such an object through a static property or method of some other object, it will be very difficult to refactor or unit test a class that relies on such a stateful object. In general, introducing a construction like that is a great example of violating many of the guidelines of this document.

A classic example of this is the `HttpContext.Current` property, part of ASP.NET. Many see the `HttpContext` class as a source for a lot of ugly code. In fact, the testing guideline [Isolate the Ugly Stuff](http://msdn.microsoft.com/en-us/magazine/dd263069.aspx#id0070015) often refers to this class.


## Return an `IEnumerable<T>` or `ICollection<T>` instead of a concrete collection class ![](imgs/should.png) ##

In general, you don't want callers to be able to change an internal collection, so don't return arrays, lists or other collection classes directly. Instead, return an `IEnumerable<T>`, or, if the caller must be able to determine the count, an `ICollection<T>`.

![NOTE](imgs/note.png) In .NET 4.5, you can also use `IReadOnlyCollection<T>`, `IReadOnlyList<T>` or `IReadOnlyDictionary<TKey, TValue>`.


## Properties, methods and arguments representing strings or collections should never be `null` ![](imgs/must.png) ##

Returning `null` can be unexpected by the caller. Always return an **empty collection** or an **empty string** instead of a `null` reference. This also prevents cluttering your code base with additional checks for `null`, or even worse, `String.IsNotNullOrEmpty()` or `String.IsNullOrWhiteSpace()`.


## Define parameters as specific as possible ![](imgs/should.png) ##

If your member needs a specific piece of data, define parameters as specific as that and don't take a container object instead. For instance, consider a method that needs a connection string that is exposed through some central `IConfiguration` interface. Rather than taking a dependency on the entire configuration, just define a parameter for the connection string. This not only prevents unnecessary coupling, it also improved maintainability in a long run.


## Consider using domain-specific value types rather than primitives ![](imgs/may.png) ##

Instead of using strings, integers and decimals for representing domain specific types such as an ISBN number, an email address or amount of money, consider created dedicated value objects that wrap both the data and the validation rules that apply to it. By doing this, you prevent ending up having multiple implementations of the same business rules, which both improves maintainability and prevents bugs.


[solid]: http://programmers.stackexchange.com/questions/202571/solid-principles-and-code-structure
[srp]: http://www.objectmentor.com/resources/articles/srp.pdf
[ocp]: http://www.objectmentor.com/resources/articles/ocp.pdf
[lsp]: http://www.objectmentor.com/resources/articles/lsp.pdf
[isp]: http://www.objectmentor.com/resources/articles/isp.pdf
[dip]: http://www.objectmentor.com/resources/articles/dip.pdf
