# Member Design Guidelines #

# 멤버 디자인 가이드라인 #

## Allow properties to be set in any order ![](imgs/must.png) ##

## 프로퍼티의 순서가 자유로울 수 있도록 허용하세요 ![](imgs/must.png) ##

Properties should be stateless with respect to other properties, i.e. there should not be a difference between first setting property `A` and then `B` or vice versa.

프로퍼티의 상태가 다른 프로퍼티에 따라 바뀌면 안된다. (?) 즉, 예를 들어 설정 속성 `A`와 `B`가 있다고 할 때, `A`, `B` 이 순서로 있을 때인지, `B`, `A` 이 순서로 있을 때인지에 따라 차이가 있으면 안된다. 

## Use a method instead of a property ##

## 속성 대신에 메소드를 사용하세요 ##

Using a method is way better than a property, if:

아래의 경우에 해당하면 속성을 사용하는 것보다 메소드를 사용하는 편이 훨씬 낫습니다. 

* The work is more expensive than setting a field value;
* it represents a conversion such as the `Object.ToString()` method;
* it returns a different result each time it is called, even if the arguments didn't change. For example, the `NewGuid()` method returns a different value each time it is called; or
* the operation causes a side effect such as changing some internal state not directly related the property (which violates the [Command Query Separation](http://martinfowler.com/bliki/CommandQuerySeparation.html)).
* 


* (무슨 의미인지...?)
* `Object.ToString()` 메소드처럼, 변환을 하는 경우
* 전달된 인자가 바뀌지 않은 경우에도, 호출될 때마다 서로 다른 결과값을 반환하는 경우. 예: `NewGuide()`
* 속성과 직접적으로 관련되지 않은 internal state를 바꾸는 등의 결과를 해당 작업이 가져오는 경우(이렇게 하면  [Command Query Separation](http://martinfowler.com/bliki/CommandQuerySeparation.html)) 원칙을 위배하게 됩니다.)


![EXCEPTION](imgs/exception.png) Populating an internal cache or implementing [lazy-loading](http://www.martinfowler.com/eaaCatalog/lazyLoad.html) is a good exception.

![EXCEPTION](imgs/exception.png) internal 캐쉬를 두거나 [lazy-loading](http://www.martinfowler.com/eaaCatalog/lazyLoad.html)을 구현하는 것은 좋은 예외인 예입니다.

## Don't use mutually exclusive properties ![](imgs/must.png) ##

## 상호 배타적인(mutually exclusive) 속성을 사용하지 마세요 ![](imgs/must.png) ##

Having properties that cannot be used at the same time typically signals a type that is representing two conflicting concepts. Even though those concepts may share some of the behavior and state, they obviously have different rules that do not cooperate.

This violation is often seen in domain models and introduces all kinds of conditional logic related to those conflicting rules, causing a ripple effect that significantly worsens the maintenance burden.

(이부분 일단 패쓰요)

## A method or property does only one thing ![](imgs/must.png) ##

## 하나의 메소드와 하나의 속성은 한 가지 작업만 해야 합니다 ![](imgs/must.png) ##

Based on [SRP][srp], a method ![MUST](imgs/must.png) have a single responsibility.

[SRP][srp]에 따라, 하나의 메소드는 한 가지 책임만 가져야 합니다. ![MUST](imgs/must.png)


## Don't expose stateful objects through static members ![](imgs/should.png) ##

## stateful 객체를 static member를 통해 노출시키지 마세요 ![](imgs/should.png) ##

A stateful object is an object that contains many properties and lots of behavior behind that. If you expose such an object through a static property or method of some other object, it will be very difficult to refactor or unit test a class that relies on such a stateful object. In general, introducing a construction like that is a great example of violating many of the guidelines of this document.

stateful 객체란 여러 개의 속성과 각 속성의 저변에 여러 가지 행동들을 가지고 있는 객체입니다. 이런 객체를 static 속성이나 다른 객체의 메소드를 통해서 노출시키면, stateful 객체에 의존하는 클래스를 리팩토링을 하거나 유닛테스트 하기가 매우 어려워질 것입니다. 일반적으로, stateful 객체같은 construction을 introduce한다는 것은 이 문서에서 제시한 가이드라인 중 많은 부분을 위배하는 좋은 예입니다. 

A classic example of this is the `HttpContext.Current` property, part of ASP.NET. Many see the `HttpContext` class as a source for a lot of ugly code. In fact, the testing guideline [Isolate the Ugly Stuff](http://msdn.microsoft.com/en-us/magazine/dd263069.aspx#id0070015) often refers to this class.

이런 경우에 해당하는 고전적인 예가 ASP.NET의 일부인 `HttpContext.Current` 속성입니다. `HttpContext` 클래스 때문에 지저분한 코드(ugly code)가 많이 생긴다고 생각하는 사람들이 많습니다. 실제로, 테스트하는 것에 대한 가이드라인 [Isolate the Ugly Stuff](http://msdn.microsoft.com/en-us/magazine/dd263069.aspx#id0070015)에서는 이 클래스를 자주 예로 듭니다 


## Return an `IEnumerable<T>` or `ICollection<T>` instead of a concrete collection class ![](imgs/should.png) ##

## 특정 컬렉션 클래스 대신에 `IEnumerable<T>` 나 `ICollection<T>`를 반환하세요 ![](imgs/should.png) ##

In general, you don't want callers to be able to change an internal collection, so don't return arrays, lists or other collection classes directly. Instead, return an `IEnumerable<T>`, or, if the caller must be able to determine the count, an `ICollection<T>`.

보통은, caller가 내부의 컬렉션(internal collection)을 바꿀 수 없기를 바랍니다. 그러니 배열, 리스트 등의 컬렉션 클래스를 직접 반환하지 마세요. 대신에 `IEnumerable<T>`를 반환하거나, caller가 수를 결정할 수 있어야 하는 경우라면, `ICollection<T>`를 반환하세요. 

![NOTE](imgs/note.png) In .NET 4.5, you can also use `IReadOnlyCollection<T>`, `IReadOnlyList<T>` or `IReadOnlyDictionary<TKey, TValue>`.

![NOTE](imgs/note.png) .NET 4.5 버전에서는, `IReadOnlyCollection<T>`, `IReadOnlyList<T>`, `IReadOnlyDictionary<TKey, TValue>` 도 사용할 수 있습니다. 


## Properties, methods and arguments representing strings or collections should never be `null` ![](imgs/must.png) ##

## 문자열이나 컬렉션을 가리키는 속성, 메소드, 인자(arguments)는 절대 `null`이 되어서는 안됩니다. ![](imgs/must.png) ## 


Returning `null` can be unexpected by the caller. Always return an **empty collection** or an **empty string** instead of a `null` reference. This also prevents cluttering your code base with additional checks for `null`, or even worse, `String.IsNotNullOrEmpty()` or `String.IsNullOrWhiteSpace()`.

caller에게 `null`을 반환하는 경우도 있을 수 있습니다. 그럴 때에는 `null`대신에 **비어 있는 컬렉션**이나 **비어있는 문자열**을 반환하세요. 이렇게 하면 `null`을 체크하는 코드나 더 심하게는 `String.IsNotNullOrEmpty()`, 또는 `String.IsNullOrWhiteSpace()`를 적느라 코드베이스를 지저분하게 만드는 것을 방지할 수 있습니다. 

## Define parameters as specific as possible ![](imgs/should.png) ##

## 매개변수는 최대한 구체적으로 정의하세요 ![](imgs/should.png) ##

If your member needs a specific piece of data, define parameters as specific as that and don't take a container object instead. For instance, consider a method that needs a connection string that is exposed through some central `IConfiguration` interface. Rather than taking a dependency on the entire configuration, just define a parameter for the connection string. This not only prevents unnecessary coupling, it also improved maintainability in a long run.

member가 특정한 데이터를 필요로 하면, 매개변수를 최대한 구체적으로 정의해야지, container object를 전달받게 하지 마세요. 예를 들어, 

???

이렇게 하면 불필요한 coupling을 방지할 수 있을 뿐 아니라, 장기적으로 유지보수하기에도 더 좋습니다.


## Consider using domain-specific value types rather than primitives ![](imgs/may.png) ##


Instead of using strings, integers and decimals for representing domain specific types such as an ISBN number, an email address or amount of money, consider created dedicated value objects that wrap both the data and the validation rules that apply to it. By doing this, you prevent ending up having multiple implementations of the same business rules, which both improves maintainability and prevents bugs.

ISBN 번호, 이메일 주소, 금액 등의 domain specific type을 나타낼 때에는 문자열, 정수형, 십진수형을 사용하기보다는 데이터와 이 데이터의 유효성을 검증하는 규칙을 다 포함하는 객체를 사용하세요. 이렇게 하면 동일한 업무에 대해서 중복해서 구현하는 것을 방지할 수 있습니다. 


[solid]: http://programmers.stackexchange.com/questions/202571/solid-principles-and-code-structure
[srp]: http://www.objectmentor.com/resources/articles/srp.pdf
[ocp]: http://www.objectmentor.com/resources/articles/ocp.pdf
[lsp]: http://www.objectmentor.com/resources/articles/lsp.pdf
[isp]: http://www.objectmentor.com/resources/articles/isp.pdf
[dip]: http://www.objectmentor.com/resources/articles/dip.pdf
