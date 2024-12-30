package com.razeft.backend.repository;

import com.razeft.backend.enitity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer> {
    public  Users findByUsername(String username);
}
