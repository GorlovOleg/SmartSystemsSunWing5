using Xunit;

namespace Tests
{
    public class ControllerTests
    {
        [Fact]
        public void Test1()
        {
            var contact = new SmartSystems.Models.Contact();
            Assert.True(string.IsNullOrEmpty(contact.Email));
        }
    }
}
