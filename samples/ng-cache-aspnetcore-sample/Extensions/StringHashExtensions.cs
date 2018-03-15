using System.Security.Cryptography;

namespace System.Text
{
    public static class StringHashExtensions
    {
        public static string ToMD5Hash(this string input, int? length = null)
        {
            using (var hash = MD5.Create())
            {
                var data = hash.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sb = new StringBuilder();
                foreach (var t in data)
                {
                    sb.Append(t.ToString("x2"));
                }


                var str = sb.ToString();
                if (length.HasValue && length > 0 && length < 32)
                {
                    str = str.Substring(0, length.Value);
                }
                return str;
            }
        }
    }
}
