﻿using System.Security.Cryptography;
using System.Text;

namespace SocialNetworkSergxlove.Core.Models
{
    public class Users
    {
        public const int MIN_LENGTH_USERNAME = 5;
        public const int MAX_LENGTH_USERNAME = 50;
        public const int MIN_LENGTH_PASSWORD = 10;
        public const int MAX_LENGTH_PASSWORD = 100;

        public Guid Id { get; }

        public string Username { get; } = string.Empty;

        public string Password { get; } = string.Empty;

        public string Role { get; } = "user";

        private Users(string username, string password)
        {
            Id = Guid.NewGuid();
            Username = username;
            Password = password;
        }

        public static (Users? user, string error) Create(string username, string password,
            Func<string, string> hashMethosd)
        {
            Users? user = null;
            string error = string.Empty;

            int usernameLength = username.Length;
            int passwordLength = password.Length;

            if (usernameLength < MIN_LENGTH_USERNAME || usernameLength > MAX_LENGTH_USERNAME)
            {
                error = $"username должно быть от {MIN_LENGTH_USERNAME} " +
                    $"до {MAX_LENGTH_USERNAME} символов.";
                return (user, error);
            }

            if(passwordLength < MIN_LENGTH_PASSWORD || passwordLength > MAX_LENGTH_PASSWORD)
            {
                error = $"password должно быть от {MIN_LENGTH_PASSWORD} " +
                    $"до {MAX_LENGTH_PASSWORD} символов.";
            }

            user = new Users(username, hashMethosd(password));
            return (user, error);
        }

        public static (Users? user, string error) Create(string username, string password)
        {
            return Create(username, password, a =>
            {
                using (SHA256 sha256 = SHA256.Create())
                {
                    byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(a));
                    StringBuilder builder = new StringBuilder();
                    foreach (byte b in bytes)
                    {
                        builder.Append(b.ToString("x2"));
                    }
                    return builder.ToString();
                }
            });
        }


    }
}
