# 유지보수성 가이드라인 Maintainability Guidelines #

## Methods does not exceed 7 statements ![](imgs/must.png) ##

A method that requires more than 7 statements is simply doing too much or has too many responsibilities. It also requires the human mind to analyze the exact statements to understand what the code is doing. Break it down in multiple small and focused methods with self-explaining names, but make sure the high-level algorithm is still clear.


## Make all members `private` and types `internal` by default ![](imgs/must.png) ##

To make a more conscious decision on which members to make available to other classes first restrict the scope as much as possible. Then carefully decide what to expose as a public member or type.


## Avoid conditions with double negatives ![](imgs/should.png) ##

Although a property like `customer.HasNoOrders` make sense, avoid using it in a negative condition like this:

```c#
bool hasOrders = !customer.HasNoOrders;
```

Double negatives are more difficult to grasp than simple expressions, and people tend to read over the double negative easily.


## Name assemblies after their contained namespace ![](imgs/may.png) ##

All DLLs should be named according to the pattern `<Company>.<Component>.dll` where `<Company>` refers to your company's name and `<Component>` contains one or more dot-separated clauses. For example `Dnb.Web.Controls.dll`.

As an example, consider a group of classes organized under the namespace `Dnb.Web.Binding` exposed by a certain assembly. According to this guideline, that assembly should be called `Dnb.Web.Binding.dll`.

![EXCEPTION](imgs/exception.png) If you decide to combine classes from multiple unrelated namespaces into one assembly, consider suffix to the assembly with `Core`, but do not use that suffix in the namespaces. For instance, `Dnb.Consulting.Core.dll`.


## Name a source file to the type it contains ![](imgs/may.png) ##

Use Pascal casing for naming the file and don’t use underscores.


## Limit the contents of a source code file to one type ![](imgs/may.png) ##

Make sure that one source file can be responsible for fully or partially contributing to one class.

![EXCEPTION](imgs/exception.png) Nested types can, for obvious reasons, be part of the same file.


## Name a source file to the logical function of the partial type ![](imgs/may.png) ##

When using partial types and allocating a part per file, name each file after the logical part that part plays. For example:

```c#
// In MyClass.cs
public partial class MyClass
{
    ...
}

// In MyClass.Designer.cs
public partial class MyClass
{
    ...
}
```


## Use using statements instead of fully qualified type names ![](imgs/may.png) ##

Limit usage of fully qualified type names to prevent name clashing. For example, don't do this.

```c#
var list = new System.Collections.Generic.List<string>();
```

Instead, do this.

```c#
using System.Collections.Generic;

var list = new List<string>();
```

If you do need to prevent name clashing, use a using directive to assign an alias:

```c#
using Label = System.Web.UI.WebControls.Label;
```


## Don't use **magic** numbers ![](imgs/must.png) ##

Don't use literal values, either numeric or strings, in your code other than to define symbolic constants. For example:

```c#
public class Whatever
{
    public static readonly Color PapayaWhip = new Color(0xFFEFD5);
    public const int MaxNumberOfWheels = 18;
}
```

Strings intended for logging or tracing are exempt from this rule. Literals are allowed when their meaning is clear from the context, and not subject to future changes, For example:

```c#
mean = (a + b) / 2;                         // okay
WaitMilliseconds(waitTimeInSeconds * 1000); // clear enough
```

If the value of one constant depends on the value of another, do attempt to make this explicit in the code.

```c#
public class SomeSpecialContainer
{
    public const int MaxItems = 32;
    public const int HighWaterMark = 3 * MaxItems / 4; // at 75%
}
```

![NOTE](imgs/note.png) An enumeration can often be used for certain types of symbolic constants.


## Only use `var` when the type is very obvious ![](imgs/must.png) ##

Only use `var` as the result of a LINQ query, or if the type is very obvious from the same statement and using it would improve readability. So don't

```c#
var i = 3;                                 // what type? int? uint? float?
var myfoo = MyFactoryMethod.Create("arg"); // Not obvious what base-class or
                                           // interface to expect. Also difficult
                                           // to refactor if you can't search for
                                           // the class
```

Instead, use `var` like this.

```c#
var q = from order in orders where order.Items > 10 and order.TotalValue > 1000;
var repository = new RepositoryFactory.Get<IOrderRepository>();
var list = new ReadOnlyCollection<string>();
```

In all of three above examples it is clear what type to expect. For a more detailed rationale about the advantages and disadvantages of using `var`, read Eric Lippert's [Uses and misuses of implicit typing](http://blogs.msdn.com/b/ericlippert/archive/2011/04/20/uses-and-misuses-of-implicit-typing.aspx).


## Declare and initialize variables as late as possible ![](imgs/should.png) ##

Avoid the C and Visual Basic styles where all variables have to be defined at the beginning of a block, but rather define and initialize each variable at the point where it is needed.


## Assign each variable in a separate statement ![](imgs/must.png) ##

Don't use confusing constructs like the one below.

```c#
var result = someField = GetSomeMethod();
```


## Favour Object and Collection Initialisers over separate statements ![](imgs/should.png) ##

Avoid

```c#
var startInfo = new ProcessStartInfo("myapp.exe");
startInfo.StandardOutput = Console.Output;
startInfo.UseShellExecute = true;
```

Instead, use [Object Initialisers](http://msdn.microsoft.com/en-us/library/bb384062.aspx).

```c#
var startInfo = new ProcessStartInfo("myapp.exe")
                {
                    StandardOutput = Console.Output,
                    UseShellExecute = true
                };
```


Similarly, instead of adding items to collection or dictionary individually

```c#
var countries = new List<string>();
countries.Add("Netherlands");
countries.Add("United States");
```

Use collection or [dictionary initialisers](http://msdn.microsoft.com/en-us/library/bb531208.aspx).

```c#
var countries = new List<string>
                {
                    "Netherlands",
                    "United States"
                };
```


## Don't make explicit comparisons to `true` or `false` ![](imgs/must.png) ##

It is usually bad style to compare a `bool` type expression to `true` or `false`. For example:

```c#
while (condition == false)                    // wrong; bad style
while (condition != true)                     // also wrong
while (((condition == true) == true) == true) // where do you stop?

while (condition)                             // OK
```


## Don't change a loop variable inside a for or `foreach` loop ![](imgs/should.png) ##

Updating the loop variable within the loop body is generally considered confusing. It is even worse that the loop variables are modified in more than one place in the loop. Consider `break` or `continue` instead, to change the loop variables.

```c#
for (int index = 0; index < 10; ++index)
{
    if (some condition)
    {
        index = 11; // Wrong! Use 'break' or 'continue' instead.
    }
}
```


## Avoid nested loops ![](imgs/should.png) ##

A method that nests loops is more difficult to understand than one with only a single loop. In fact, in most cases having nested loops can be replaced with a much simpler LINQ query that uses the `from` keyword twice or more to join the data.


## Always add a block after keywords such as `if`, `else`, `while`, `for`, `foreach` and `case` ![](imgs/should.png) ##

Please note that this also avoids possible confusion in statements of the form:

```c#
// The wrong way:
if (b1) if (b2) Foo(); else Bar(); // which 'if' goes with the 'else'?

// The right way:
if (b1)
{
    if (b2)
    {
        Foo();
    }
    else
    {
        Bar();
    }
}
```


## Always add a default block after the last `case` in a `switch` statement ![](imgs/must.png) ##

Add a descriptive comment if the default block is supposed to be empty. Moreover, if that block is not supposed to be reached, throw an `InvalidOperationException` to detect future changes that may fall through the existing cases. This ensures better code, because all paths the code can travel has been thought about.

```c#
void Foo(string answer)
{
    switch (answer)
    {
        case "no":
            Console.WriteLine("You answered with No");
            break;
        case "yes":
            Console.WriteLine("You answered with Yes");
            break;
        default:
            // Not supposed to end up here.
            throw new InvalidOperationException("Unexpected answer " + answer);
    }
}
```


## Finish every `if`-`else`-`if` statement with an `else` part ![](imgs/should.png) ##

Similarly to the `default` block in a `switch` statement, consider the following way:

```c#
void Foo(string answer)
{
    if (answer == "no")
    {
        Console.WriteLine("You answered with No");
    }
    else if (answer == "yes")
    {
        Console.WriteLine("You answered with Yes");
    }
    else
    {
        // What should happen when this point is reached? Ignored? If not,
        // throw an InvalidOperationException.
    }
}
```


## Be reluctant with multiple return statements ![](imgs/should.png) ##

One entry, one exit is a sound principle and keeps control flow readable. However, if the method is very small and complies with [this guideline](Maintainability.Guidelines.md#methods-does-not-exceed-7-statements-) then multiple return statements may actually improve readability over some central boolean flag that is updated at various points.


## Don't use `if`-`else` statements instead of a simple (conditional) assignment ![](imgs/should.png) ##

Express your intentions directly. For example:

```c#
// Bad practice
bool pos;
if (val > 0)
{
    pos = true;
}
else
{
    pos = false;
}

// Preferred practice
bool pos = (val > 0); // initialisation
```

Or this can be another alternative:

```c#
// Avoid
string result;
if (someString != null)
{
    result = someString;
}
else
{
    result = "Unavailable";
}
return result;

// Instead
return someString ?? "Unavailable";
```


## Encapsulate complex expressions in a method or property ![](imgs/must.png) ##

Consider the following example:

```c#
if (member.HidesBaseClassMember && (member.NodeType != NodeType.InstanceInitializer))
{
    // do something
}
```

In order to understand what this expression is about, you need to analyse its exact details and all the possible outcomes. Obviously, you could add an explanatory comment on top of it, but it is much better to replace this complex expression with a clearly named method like:

```c#
if (NonConstructorMemberUsesNewKeyword(member))
{
    // do something
}

private bool NonConstructorMemberUsesNewKeyword(Member member)
{
    return member.HidesBaseClassMember &&
           member.NodeType != NodeType.InstanceInitializer;
}
```

You still need to understand the expression if you are modifying it, but the calling code is now much easier to grasp.


## Call the most overloaded method from other overloads ![](imgs/should.png) ##

This guideline only applies to overloads that are intended for providing optional arguments. Consider for example:

```c#
public class MyString
{
    private string someText;

    public MyString(string text)
    {
        this.someText = text;
    }

    public int IndexOf(string phrase)
    {
        return IndexOf(phrase, 0, someText.Length);
    }

    public int IndexOf(string phrase, int startIndex)
    {
        return IndexOf(phrase, startIndex, someText.Length - startIndex );
    }

    public virtual int IndexOf(string phrase, int startIndex, int count)
    {
        return someText.IndexOf(phrase, startIndex, count);
    }
}
```

The class `MyString` provides three overloads for the `IndexOf` method, but two of them simply call the one with the most parameters.

![NOTE](imgs/note.png) The same rule can apply to class constructors; implement the most complete overload and call that one from the other overloads using the `this()` operator.

![NOTE](imgs/note.png) The parameters with the same name should appear in the same position in all overloads.

![IMPORTANT](imgs/important.png) If you also want to allow derived classes to override these methods, define the most complete overload as a `protected virtual` method that is called by all overloads.


## Only use optional arguments to replace overloads ![](imgs/must.png) ##

The only valid reason for using C# 4.0's optional arguments is to replace the example from [this guideline](Maintainability.Guidelines.md#call-the-most-overloaded-method-from-other-overloads-) with a single method like:

```c#
public virtual int IndexOf(string phrase, int startIndex = 0, int count = 0)
{
	return someText.IndexOf(phrase, startIndex, count);
}
```

If the optional parameter is a reference type then it can only have a default value of `null`. But since strings, lists and collections should never be `null` according to [this rule](Miscellaneous.Design.Guidelines.md#dont-pass-null-as-the-sender-argument-when-raising-an-event-), you must use overloaded methods instead.

![NOTE](/imgs/note.png) The default values of the optional parameters are stored at the caller side. As such, changing the default value without recompiling the calling code will not apply the new default value properly.

![NOTE](/imgs/note.png) When an interface method defines an optional parameter, its default value is not considered during overload resolution unless you call the concrete class through the interface reference. See [this post](http://blogs.msdn.com/b/ericlippert/archive/2011/05/09/optional-argument-corner-cases-part-one.aspx) by Eric Lippert for more details.


## Avoid using named arguments ![](imgs/must.png) ##

C# 4.0's named arguments have been introduced to make it easier to call COM components that are known for offering tons of optional parameters. If you need named arguments to improve the readability of the call to a method, that method is probably doing too much and should be refactored.

The only exception where named arguments improve readability is when a constructor that yields a valid object is called like this:

```c#
Person person = new Person
                (
                    firstName: "John", 
                    lastName: "Smith", 
                    dateOfBirth: new DateTime(1970, 1, 1)
                );
```


## Don't allow methods and constructors with more than three parameters ![](imgs/must.png) ##

If you end up with a method with more than three parameters, use a structure or class for passing multiple arguments such as explained in the [Specification](http://en.wikipedia.org/wiki/Specification_pattern) design pattern. In general, the fewer the number of parameters, the easier it is to understand the method. Additionally, unit testing a method with many parameters requires many scenarios to test.


## Don't use `ref` or `out` parameters ![](imgs/must.png) ##

They make code less understandable and might cause people to introduce bugs. Prefer returning compound objects instead.


## Avoid methods that take a `bool` flag ![](imgs/should.png) ##

Consider the following method signature:

```c#
public Customer CreateCustomer(bool platinumLevel) {}
```

On first sight this signature seems perfectly fine, but when calling this method you will lose this purpose completely:

```c#
Customer customer = CreateCustomer(true);
```

Often, a method taking such a flag is doing more than one thing and needs to be refactored into two or more methods. An alternative solution is to replace the flag with an enumeration. 


## Don't use parameters as temporary variables ![](imgs/may.png) ##

Never use a parameter as a convenient variable for storing temporary state. Even though the type of your temporary variable may be the same, the name usually does not reflect the purpose of the temporary variable.


## Always check the result of an as operation ![](imgs/must.png) ##

If you use as to obtain a certain interface reference from an object, always ensure that this operation does not return `null`. Failure to do so may cause a `NullReferenceException` at a much later stage if the object did not implement that interface.


## Don't comment out code ![](imgs/must.png) ##

Never check-in code that is commented-out, but instead use a work item tracking system to keep track of some work to be done. Nobody knows what to do when they encounter a block of commented-out code. Was it temporarily disabled for testing purposes? Was it copied as an example? Should I delete it? 

