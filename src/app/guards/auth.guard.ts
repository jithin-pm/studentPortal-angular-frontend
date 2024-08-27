import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  
  
  if(authService.islogged()){
    return true;
  }
  else{
    Swal.fire({
      title: 'oops!',
      text: 'Please Loggin',
      icon: 'warning',
      confirmButtonText: 'Cool'
    })
    return false;
    
  }
};
