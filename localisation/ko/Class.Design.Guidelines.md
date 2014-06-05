# Class Design Guidelines #

## A class or interface should have a single purpose ![](imgs/must.png) ##

A class or interface should have a single purpose within the system it participates in. In general, a class is either representing a primitive type like an email or ISBN number, an abstraction of some business concept, a plain data structure or responsible for orchestrating the interaction between other classes. It is never a combination of those. This rule is widely known as the [Single Responsibility Principle (SRP)][srp], one of the [SOLID principles][solid].

Using [Design Patterns](http://en.wikipedia.org/wiki/Design_pattern_(computer_science)) is to communicate the intent of a class. If a single design pattern is assigned to a class, the class is more likely doing more than one thing.


## An interface should be small and focused ![](imgs/should.png) ##

Interfaces should have a name that clearly explains the purpose or role of that interface within the system. Do not combine many vaguely related members on the same interface just because they were all on the same class. Separate the members based on the responsibility of those members so that callers only need to call or implement the interface related to a particular task. This rule is more commonly known as the [Interface Segregation Principle (ISP)][isp], one of the [SOLID principles][solid].


## Use an interface rather than a base class to support multiple implementations ![](imgs/may.png) ##

If you want to expose an extension point from your class, expose it as an interface rather than a base class. You don't want to force users of that extension point to derive their implementations from a base-class that might have undesired behavior. However, for their convenience you may implement an (abstract) default implementation that can serve as a starting point.


## Use an interface to decouple classes from each other ![](imgs/should.png) ##

Interfaces are a very effective mechanism for decoupling classes from each other because:

* they can prevent bidirectional associations;
* they simplify the replacement of one implementation with another;
* They allow replacing an expensive external service or resource with a temporary stub for use in a non-production environment;
* they allow replacing the actual implementation with a dummy implementation or a fake object in a unit test; and
* using a dependency injection framework you can centralize the choice which class is going to be used whenever a specific interface is requested.


## Avoid static classes ![](imgs/may.png) ##

Static classes very often lead to badly designed code, except implementing extension method containers. They are also very difficult to test in isolation unless you're willing to use some very hacky tools.

![NOTE](imgs/note.png) If you really need a static class, mark it as `static` so that the compiler can prevent the class and its members from instantiating. This relieves you of creating an explicit private constructor.


## Don't hide inherited members with the `new` keyword ![](imgs/must.png) ##

Not only does the new keyword break [Polymorphism](http://en.wikipedia.org/wiki/Polymorphism_in_object-oriented_programming), one of the most essential object-orientation principles, it also makes subclasses more difficult to understand. Consider the following two classes:

```c#
public class Book
{
    public virtual void Print()
    {
        Console.WriteLine("Printing Book");
    }
}

public class PocketBook : Book
{
    public new void Print()
    {
        Console.WriteLine("Printing PocketBook");
    }
}
```

This will cause behavior that you would not normally expect from class hierarchies:

```c#
var pocketBook = new PocketBook();

pocketBook.Print();         // Will output "Printing PocketBook "
((Book)pocketBook).Print(); // Will output "Printing Book"
```

It ![MUST](imgs/must.png) **NOT** make a difference whether you call Print through a reference to the base class or through the derived class.


## Treat a derived object as if it were a base class object ![](imgs/should.png) ##

In other words, you ![SHOULD](imgs/should.png) be able to use a reference to an object of a derived class wherever a reference to its base class object is used without knowing the specific derived class. A very notorious example of a violation of this rule is throwing a `NotImplementedException` when overriding some of the base-class methods. A less subtle example is not honoring the behavior expected by the base-class. This rule is also known as the [Liskov Substitution Principle (LSP)][lsp], one of the [SOLID principles][solid].


## Don't refer to derived classes from the base class ![](imgs/must.png) ##

Having dependencies from a base class to its sub-classes goes against proper object-oriented design and might prevent other developers from adding new derived classes.


## Avoid exposing the other objects an object depends on ##

If you find yourself writing code like this then you might be violating the [Law of Demeter (LoD)](http://en.wikipedia.org/wiki/Law_of_Demeter). More detailed explanations of LoD can be found at [here](http://www.blackwasp.co.uk/LawOfDemeter.aspx).

```c#
someObject.SomeProperty.GetChild().Foo()
```

An object should not expose any other classes it depends on because callers may misuse that exposed property or method to access the object behind it. By doing so, you allow calling code to become coupled to the class you are using, and thereby limiting the chance you can easily replace it in a future stage.

![NOTE](imgs/note.png) Using a class designed with the [Fluent Interface](http://en.wikipedia.org/wiki/Fluent_interface) pattern like LINQ does seem to violate this rule, but it is simply returning itself so that method chaining is allowed.

![EXCEPTION](imgs/exception.png) Inversion of Control (or Dependency Injection) frameworks such as [Unity](http://msdn.microsoft.com/unity), [Autofac](http://autofac.org) or [Ninject](http://www.ninject.org) often require you to expose a dependency as a public property. As long as this property is not used for anything else than dependency injection, it wouldn't be considered as a violation.


## Avoid bidirectional dependencies ![](imgs/must.png) ##

This means that two classes know about each other's public members or rely on each other's internal behavior. Refactoring or replacing one of those two classes requires changes on both parties and may involve a lot of unexpected work. The most obvious way of breaking that dependency is introducing an interface for one of the classes and using dependency injection.


## Classes should have state and behavior ![](imgs/must.png) ##

Unless your classes are only to transfer data over communication channels called [Data Transfer Objects](http://martinfowler.com/eaaCatalog/dataTransferObject.html), they ![MUST](imgs/must.png) have logics defining their state and behavior.


[solid]: http://programmers.stackexchange.com/questions/202571/solid-principles-and-code-structure
[srp]: http://www.objectmentor.com/resources/articles/srp.pdf
[ocp]: http://www.objectmentor.com/resources/articles/ocp.pdf
[lsp]: http://www.objectmentor.com/resources/articles/lsp.pdf
[isp]: http://www.objectmentor.com/resources/articles/isp.pdf
[dip]: http://www.objectmentor.com/resources/articles/dip.pdf
