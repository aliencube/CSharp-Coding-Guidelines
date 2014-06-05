# Performance Guidelines #

## Consider using `Any()` to determine whether an `IEnumerable<T>` is empty ![](imgs/may.png) ##

When a method or other member returns an `IEnumerable<T>` or other collection class that does not expose a `Count` property, use the `Any()` extension method rather than `Count()` to determine whether the collection contains items. If you do use `Count()`, you risk that iterating over the entire collection might have a significant impact (such as when it really is an `IQueryable<T>` to a persistent store).

![NOTE](imgs/note.png) If you return an `IEnumerable<T>` to prevent editing from outside the owner as explained in [here](Member.Design.Guidelines.md#return-an-ienumerablet-or-icollectiont-instead-of-a-concrete-collection-class-) and you're developing in .NET 4.5+, consider the new read-only classes. 


## Only use async for low-intensive long-running activities ##

The usage of `async` won't automatically run something on a worker thread like `Task.Run` does. It just adds the necessary logic to allow releasing the current thread and marshal the result back on that same thread if a long-running asynchronous operation has completed. In other words, use `async` only for I/O bound operations. 


## Prefer Task.Run for CPU intensive activities ##

If you do need to execute a CPU bound operation, use `Task.Run` to offload the work to a thread from the Thread Pool. Just don't forget that you have to marshal the result back to your main thread manually.


## Beware of mixing up `await`/`async` with `Task.Wait` ##

`await` will not block the current thread but simply instruct to compiler to generate a state-machine. However, `Task.Wait` will block the thread and may even cause dead-locks (See [Beware of async/await deadlocks in single-threaded environments](Performance.Guidelines.md#beware-of-async-await-deadlocks-in-single-threaded-environments)).


## Beware of `async`/`await` deadlocks in single-threaded environments ##

Consider the following asynchronous method:

```c#
private async Task<string> GetDataAsync()
{
	var result = await MyWebService.GetDataAsync();
	return result.ToString();
}
```

Now when an ASP.NET MVC controller action does this:

```c#
public ActionResult ActionAsync()
{
	var data = GetDataAsync().Result;
		
	return View(data);
}
```

You'll end up with a deadlock. Why? Because the `Result` property getter will block until the `async` operation has completed, but since an `async` method will automatically marshal the result back to the original thread and ASP.NET uses a single-threaded synchronisation context, they'll be waiting on each other. A similar problem can also happen on WPF, Silverlight or a Windows Store C#/XAML app. Read more about this [here](http://blogs.msdn.com/b/pfxteam/archive/2011/01/13/10115163.aspx).

