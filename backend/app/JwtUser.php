<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JwtUser
{
    private $user;
    private $properties;

    /**
     * @return JwtUser
     */
    public static function get()
    {
        return new JwtUser;
    }

    public function __construct()
    {
        $this->user = \Auth0::jwtUser();
        $this->properties = new \stdClass;
    }

    public function __get($key)
    {
        if ($key == 'groups') {
            try {
                if ($this->properties->groups == null) {
                    $this->properties->groups = $this->where('App\Group');
                }
            } catch (\Exception $ex) {
                $this->properties->groups = Group::where('user', $this->user->sub)->get();
            }
        }
        return $this->properties->$key;
    }

    public function toArray()
    {
        $arr = array_merge($this->objToArray($this->user), $this->objToArray($this->properties));
        return $arr;
    }

    private function objToArray($obj)
    {
        return json_decode(json_encode($obj), true);
    }

    private function where($className, $foreignKey = 'user')
    {
        $class = new \ReflectionClass($className);
        $obj = $class->newInstanceWIthoutConstructor();
        return $obj::where($foreignKey, $this->user->sub)->get();
    }
}
