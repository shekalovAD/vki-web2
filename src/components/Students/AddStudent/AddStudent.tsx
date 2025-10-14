import React from 'react';
import { useForm } from 'react-hook-form';

export interface StudentFormData {
  name: string;
  email: string;
  age: number;
  course: string;
}

interface AddStudentProps {
  onSubmit: (data: StudentFormData) => void;
  loading: boolean;
}

const AddStudent: React.FC<AddStudentProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<StudentFormData>();

  const handleFormSubmit = (data: StudentFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="add-student-form">
      <h3>Добавить нового студента</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'Имя обязательно для заполнения',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа'
              }
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email обязателен для заполнения',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный формат email'
              }
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Возраст:</label>
          <input
            id="age"
            type="number"
            {...register('age', {
              required: 'Возраст обязателен для заполнения',
              min: {
                value: 16,
                message: 'Возраст должен быть не менее 16 лет'
              },
              max: {
                value: 100,
                message: 'Возраст должен быть не более 100 лет'
              },
              valueAsNumber: true
            })}
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Курс:</label>
          <input
            id="course"
            type="text"
            {...register('course', {
              required: 'Курс обязателен для заполнения'
            })}
          />
          {errors.course && <span className="error">{errors.course.message}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Добавление...' : 'Добавить студента'}
        </button>
      </form>
    </div>
  );
};

export default AddStudent; 